export const BASE_API = "http://localhost:8080";

export const endpoints = {
  //Auth/Registraion Endpoints
  registration: `${BASE_API}/auth/register`, // post
  /* registration (Body)
    { 
        "userName": "john_doe",
        "firstName": "John",
        "lastName": "Doe",
        "password": "securePassword123",
        "email": "elenabozko1210@gmail.com",
        "gender": "Male",
        "tgName": "john_doe_tg",
        "birthDay": "1990-01-15"
    }  
  */
  auth: `${BASE_API}/auth/sing-in`, // post (Body) {"username":"john_doe","password":"securePassword123"} //! sing - sign
  refreshToken: `${BASE_API}/auth/refresh`, //post
  confirmEmail: (code:string) => `${BASE_API}/auth/activate/${code}`,
  getUser: (userLogin: string) => `${BASE_API}/api/user/${userLogin}`, //get //http://localhost:8080/api/user/{login}

  //Admin Endpoints
  adminGetAllUsers: `${BASE_API}/admin/users`, //get
  adminGetAllGroups: `${BASE_API}/admin/groups`, //get
  adminGetAllInterests: `${BASE_API}/admin/interests`, //get
  adminAddInterest: (interestName:string, interestColor:string) => `${BASE_API}/admin/interest?name=${interestName}&color=${interestColor}`, // post http://localhost:8080/admin/interest?name={interestName}&color={interestColor}
  deleteInterestByName: (interestName: string) => `${BASE_API}/admin/interest/delete?interestName=${interestName}`, //delete http://localhost:8080/admin/interest/delete?interestName={interestName}
  deleteGroupById: (groupId: string) => `${BASE_API}/admin/group/${groupId}`, //delete http://localhost:8080/admin/group/{id}
  deleteUserByLogin: (userLogin: string) => `${BASE_API}/admin/user/delete?login=${userLogin}`, //delete http://localhost:8080/admin/user/delete?login={userLogin}

  //Group Endpoints
  createGroup: (userLogin: string) => `${BASE_API}/groups/${userLogin}/create`, //post //http://localhost:8080/groups/{userLogin}/create
  /* createGroup (Body)
    {
        "chars": "WWs",
        "name" : "Daday",
        "color": "000",
        "description": "WinWin"
        "interests": [
          {name: sdfsdf, color: sdfsdf},
          {name: sdfsdf, color: sdfsdf}
        ]
    }
  */
  addInterestToGroup: (groupId: string) => `${BASE_API}/groups/${groupId}/interests`, //post //http://localhost:8080/groups/{groupId}/interests
  fetchGroupByPrefixName:  `${BASE_API}/groups/search_name?prefix_name=`, //get //http://localhost:8080/groups/search_name?prefix_name={groupChars} - необязательный 
  fetchGroupsByInterest:   `${BASE_API}/groups/search_interest`, //get //http://localhost:8080/groups/search_interest
  deleteOwnerGroupById: (groupId: string) => `${BASE_API}/groups/${groupId}`, //delete http://localhost:8080/groups/{groupID} Вроде удаляются только если токен хедера соответсвтует токену создателя группы
  getGroupById: (groupId: string) => `${BASE_API}/groups/${groupId}`,
  getAllGroups: `${BASE_API}/groups`, //get //http://localhost:8080/groups
  inviteUserToGroup: (groupId: string, fromLogin:string, toLogin:string) => `${BASE_API}/groups/${groupId}/users?from_username=${fromLogin}&to_username=${toLogin}`, //http://localhost:8080/groups/1/users?from_username=Bobo&to_username=Bobo2
  leaveFromGroup: (username:string,groupdId:string) => `${BASE_API}/api/user/${username}/unsubscribe?groupId=${groupdId}`, //http://localhost:8080/api/user/john2/unsubscribe?groupId=2
  getSubscribedGroups: (userLogin: string) => `${BASE_API}/api/user/${userLogin}/groups`, //get
  postUserSubscribeToGroup: (userLogin: string, groupId: number) => `${BASE_API}/api/user/${userLogin}/subscribe?groupId=${groupId}`, //post
  getAvailableUsersForInvite: (groupId:string,login:string)=>`${BASE_API}/api/notifications/available-invitations?groupId=${groupId}&login=${login}`,// get availableusers http://localhost:8080/api/notifications/available-invitations?groupId=1&login=1



  //User Endpoints
  getUserCreatedGroups: (userLogin: string) => `${BASE_API}/api/user/${userLogin}/groups/created`, //get
  uploadProfileImage: (userLogin: string)=> `${BASE_API}/api/user/${userLogin}/profile-image`, //post
  deleteUserInterests: (userLogin:string) => `${BASE_API}/api/user/${userLogin}/interests`, //delete
  getUserInterests: (userLogin:string) => `${BASE_API}/api/user/${userLogin}/interests`, //get
  addUserInterest: (userlogin: string) =>  `${BASE_API}/api/user/${userlogin}/interests`,  //post
  updateSecurityInfo: (userLogin: string, newLogin: string, newPassword: string, newEmail: string) =>  `${BASE_API}/api/user/${userLogin}/security?new_login=${newLogin}&password=${newPassword}&email=${newEmail}`, //put
  fetchUserByInterests: `${BASE_API}/api/user/search_interest`, //post (get) {body}
  fetchUserByFullname: (firstName:string, lastName:string, patronymic:string) => `${BASE_API}/api/user/search_name?firstName=${firstName}&lastName=${lastName}&patronymic=${patronymic}`, //get 
  fetchUserByUsername: `${BASE_API}/api/user/search_username`, //post (get) {body}
  deleteOwnerUserByLogin: (userLogin:string) => `${BASE_API}/api/user/${userLogin}`, //delete 
  updateUser: (userLogin:string) => `${BASE_API}/api/user/${userLogin}/update`, //put  

  //Friendship
  getFriendship: (userName:string) => `${BASE_API}/friendships/search?login=${userName}`,
  sendFriendshipRequest: (login:string,friendLogin:string) => `${BASE_API}/friendships/send?login=${login}&friendLogin=${friendLogin}`,
  removeFriendship: (login:string, friendLogin:string) => `${BASE_API}/friendships/remove?userName=${login}&friendName=${friendLogin}`,
  getFriendshipRequests: (login:string)=>`${BASE_API}/friendships/incoming-requests?login=${login}` , //get http://localhost:8080/friendships/incoming-requests?login=ilya
  declineFriendshipReq: (login:string,friendLogin:string)=> `${BASE_API}/friendships/decline?login=${login}&friendLogin=${friendLogin}`, // post http://localhost:8080/friendships/decline?login=mauzek&friendLogin=boby
  acceptFriendshipReq: (login:string,friendLogin:string)=> `${BASE_API}/friendships/accept?login=${login}&friendLogin=${friendLogin}`, // post http://localhost:8080/friendships/accept?login=3&friendLogin=ilya


  //notifications
  getNotificationsByUsername: (username:string) => `${BASE_API}/api/notifications?username=${username}`,  // http://localhost:8080/api/notifications?username=3 
  acceptNotification: (notificationId:string)=> `${BASE_API}/api/notifications/accept?notificationId=${notificationId}`, // http://localhost:8080/api/notifications/accept?notificationId=1
  cancelNotification: (notificationId:string)=> `${BASE_API}/api/notifications/cancel?notificationId=${notificationId}`, // http://localhost:8080/api/notifications/accept?notificationId=1

};