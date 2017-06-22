/**
 * @file generateInvite command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (Bastion, message, args) => {
  if (!message.channel.permissionsFor(message.member).has(this.help.userPermission)) {
    /**
     * User has missing permissions.
     * @fires userMissingPermissions
     */
    return Bastion.emit('userMissingPermissions', this.help.userPermission);
  }
  if (!message.channel.permissionsFor(message.member).has(this.help.botPermission)) {
    /**
     * Bastion has missing permissions.
     * @fires bastionMissingPermissions
     */
    return Bastion.emit('bastionMissingPermissions', this.help.botPermission, message);
  }

  message.channel.createInvite({
    maxAge: args.age * 60,
    maxUses: args.uses
  }).then(invite => {
    message.channel.send(`discord.gg/${invite.code}`).catch(e => {
      Bastion.log.error(e);
    });
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'uses', type: Number, alias: 'u', defaultValue: 3 },
    { name: 'age', type: Number, alias: 'a', defaultValue: 1440 }
  ]
};

exports.help = {
  name: 'generateinvite',
  description: 'Generates an invite link of the channel the command was ran in.',
  botPermission: 'CREATE_INSTANT_INVITE',
  userPermission: 'CREATE_INSTANT_INVITE',
  usage: 'generateInvite [-u <NO_OF_USES>] [-a <INVITE_LINK_TIMEOUT_IN_MINUTES>]',
  example: [ 'generateInvite', 'generateInvite -u 1 -a 10' ]
};