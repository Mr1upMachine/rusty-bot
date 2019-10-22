import { FieldValue, Firestore } from '@google-cloud/firestore';
import { Client, GuildMember, Message, MessageReaction, User } from 'discord.js';

exports.addReaction = async () => {

};

exports.removeReaction = async () => {

};

exports.messageSent = async (client: Client, msg: Message, firestore: Firestore) => {
    // Null checks
    if (!msg.guild) { return; }
    if (!msg.member) { return; }
    if (!msg.author) { return; }

    // Prevent bots from affecting stats
    if (msg.author.bot) { return; }

    const guildRef = firestore.collection('guilds').doc(msg.guild.id);
    const userRef = guildRef.collection('members').doc(msg.member.id);

    userRef.set({ posts: FieldValue.increment(1) }, {merge: true});
};

exports.messageEdit = async () => {

};

exports.memberEdit = async (client: Client, oldMember: GuildMember, newMember: GuildMember, firestore: Firestore) => {

  // Prevent bots from affecting stats
  if (newMember.user.bot) { return; }

  // Return if name/nickname hasn't changed
  if (newMember.displayName === oldMember.displayName) { return; }

  // Update saved name in firestore
  const userRef = firestore.collection('guilds').doc(newMember.guild.id).collection('members').doc(newMember.id);
  userRef.set({ name: newMember.displayName }, {merge: true});
};
