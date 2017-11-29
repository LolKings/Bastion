/**
 * @file avatar command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (Bastion, message, args) => {
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = message.guild.members.get(args.id);
    if (user) {
      user = user.user;
    }
  }
  if (!user) {
    user = message.author;
  }

  message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      fields: [
        {
          name: 'Avatar',
          value: user.tag
        }
      ],
      image: {
        url: user.displayAvatarURL.split('?')[0]
      }
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'av' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'avatar',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'avatar [@user-mention]',
  example: [ 'avatar @user#001', 'avatar' ]
};
