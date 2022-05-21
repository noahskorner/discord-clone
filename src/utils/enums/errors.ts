/* eslint-disable no-unused-vars */
enum ErrorEnum {
  SERVER_NOT_FOUND = 'ServerService.findById.ServerNotFound',
  INSUFFICIENT_PERMISIONS = 'ServerService.findById.InsufficientPermissions',
  CHANNEL_NOT_FOUND = 'ChannelService.findById.ChannelNotFound',
  ADDRESSEE_NOT_FOUND = 'FriendService.createFriendRequest.AddresseeNotFound',
  FRIEND_REQUEST_ALREADY_EXISTS = 'FriendService.createFriendRequest.FriendRequestAlreadyExists.',
  FRIENDS_WITH_SELF = 'FriendService.createFriendRequest.FriendsWithSelf',
}

export default ErrorEnum;
