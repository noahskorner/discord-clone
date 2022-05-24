/* eslint-disable no-unused-vars */
enum ErrorEnum {
  SERVER_NOT_FOUND = 'ServerService.findById.ServerNotFound',
  INSUFFICIENT_PERMISIONS = 'ServerService.findById.InsufficientPermissions',
  CHANNEL_NOT_FOUND = 'ChannelService.findById.ChannelNotFound',
  ADDRESSEE_NOT_FOUND = 'FriendService.createFriendRequest.AddresseeNotFound',
  FRIEND_REQUEST_ALREADY_EXISTS = 'FriendService.createFriendRequest.FriendRequestAlreadyExists.',
  FRIENDS_WITH_SELF = 'FriendService.createFriendRequest.FriendsWithSelf',
  FRIEND_REQUEST_NOT_FOUND = 'FriendService.acceptFriendRequest.FriendRequestNotFound',
  FRIEND_REQUEST_INSUFFICIENT_PERMISSIONS_UPDATE = 'FriendService.acceptFriendRequest.FriendRequestInsufficientPermissionsUpdate',
  FRIEND_REQUEST_INSUFFICIENT_PERMISSIONS_DELETE = 'FriendService.acceptFriendRequest.FriendRequestInsufficientPermissionsDelete',
  ADD_SERVER_USER_INSUFFICIENT_PERMISSIONS = 'ServerUserService.addUserToServer.AddServerUserInsufficientPermissions',
  INVITE_SERVER_USER_INSUFFICIENT_PERMISSIONS = 'ServerInviteService.inviteUserToServer.InviteServerUserInsufficientPermissions',
  INVITE_SERVER_USER_ALREADY_EXISTS = 'ServerInviteService.inviteUserToServer.InviteServerUserAlreadyExists',
  CREATE_DIRECT_MESSAGE_NOT_FRIENDS_WITH_ENTIRE_GROUP = 'DirectMessageService.createDirectMessage.CreateDirectMessageNotFriendsWithEntireGroup',
}

export default ErrorEnum;
