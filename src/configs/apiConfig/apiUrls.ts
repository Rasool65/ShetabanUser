// Authentication
export const APIURL_LOGIN = '/account/login';
export const APIURL_LOGIN_CONFIRM_CODE = '/account/sendConfirmCode';
export const APIURL_LOGIN_FORGET_CODE = '/account/forgotpassword';
export const APIURL_RESET_PASSWORD = '/account/resetpassword';
export const APIURL_LOGIN_CHECK_FORGET_CODE = '/account/confirmforgotpassword';
export const APIURL_LOGIN_CHECK_CONFIRM_CODE = '/account/confirmCode';
export const APIURL_GET_GENERAL_INFO = '/common/getGeneralInfoSetting';
export const APIURL_GET_PAGES_TYPE = '/common/pages';
export const APIURL_GET_COMPANIES = 'common/getcompanies';
//profile
export const APIURL_GET_PROFILE = 'user/userprofile/profile';
export const APIURL_UPDATE_PROFILE = 'user/userprofile/profile';
export const APIURL_UPDATE_PROFILE_PASSWORD = 'user/userprofile/changepassword';

// Ticket
export const APIURL_GET_CONVERSATIONS = '/user/conversation/conversations';
export const APIURL_GET_MESSAGES = '/user/conversation/messages';
export const APIURL_SEND_MESSAGE = '/user/conversation/sendmessage';
export const APIURL_CREATE_CONVERSATION = '/user/conversation/createConversation';
export const APIURL_NEW_MESSAGE_COUNT = '/user/conversation/getusermessagescount';

//requests
export const APIURL_GET_CUSTOMERS = 'user/customers/getlist';
export const APIURL_GET_SHIPPINGS = 'user/shippingtypes/getlist';
export const APIURL_GET_MATERIALS = 'user/materials/getlist';
export const APIURL_GET_ROUTES = 'user/routes/getlist';
export const APIURL_CREATE_REQUEST = 'user/shipmentorder/create';
