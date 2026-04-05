import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessageModal.js";

export const searchContacts = async (request, response, next) => {
  try {
    const { searchTerm, page = 1, limit = 10 } = request.body;

    if (!searchTerm) {
      return response.status(400).send("search term is required!");
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const query = {
      $and: [
        { _id: { $ne: request.userId } },
        { profileSetup: true },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    };

    const skip = (page - 1) * limit;

    // total matching contacts count
    const totalContacts = await User.countDocuments(query);

    // paginated contacts
    const contacts = await User.find(query)
      .skip(skip)
      .limit(limit)
      .select("_id email firstName lastName image color profileSetup");

    return response.status(200).json({
      contacts,
      pagination: {
        totalContacts,
        currentPage: page,
        totalPages: Math.ceil(totalContacts / limit),
        limit,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export const getContactsForDMList = async (request, response, next) => {
  try {
    let { userId } = request;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return response.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internet Server Error");
  }
};
