// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Chat App Component Imports
import Chat from './Chat';
import Sidebar from './SidebarLeft';
import UserProfileSidebar from './UserProfileSidebar';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getChatContacts } from './store';

import '@styles/base/pages/app-chat.scss';
import '@styles/base/pages/app-chat-list.scss';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_GET_CONVERSATIONS, APIURL_GET_MESSAGES } from '@src/configs/apiConfig/apiUrls';
import { handleAllTickets, handleCurrentTicket } from '@src/redux/reducers/ticketReducer';

const AppChat = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ticket);
  const { currentTicket } = store;
  // ** States
  const [user, setUser] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [userSidebarRight, setUserSidebarRight] = useState(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState(false);

  const { getRequest, postRequest } = useHttpRequest();

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar);
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
  const handleOverlayClick = () => {
    setSidebar(false);
    setUserSidebarRight(false);
    setUserSidebarLeft(false);
  };

  // ** Set user function for Right Sidebar
  const handleUser = (obj) => setUser(obj);

  // ** Get data on Mount
  // useEffect(() => {
  //   dispatch(getChatContacts());
  //   dispatch(getUserProfile());
  // }, [dispatch]);

  useEffect(() => {
    postRequest(APIURL_GET_CONVERSATIONS, {
      page: 9999,
      limit: 100,
      search: 'string',
    }).then((result) => {
      dispatch(handleAllTickets(result.data.data));
    });
  }, []);

  const getCurrentConversation = () => {
    postRequest(APIURL_GET_MESSAGES, {
      page: 9999,
      limit: 100,
      search: '',
      conversationId: currentTicket[0].conversationId,
    }).then((result) => {
      dispatch(handleCurrentTicket(result.data.data));
    });
  };

  return (
    <div className="app-content">
      <div className="chat-application ">
        <div
          className="content-area-wrapper"
          style={{ display: 'flex', width: '80%', position: 'relative', right: '20rem', top: '8rem' }}
        >
          <Sidebar
            store={store}
            sidebar={sidebar}
            handleSidebar={handleSidebar}
            userSidebarLeft={userSidebarLeft}
            handleUserSidebarLeft={handleUserSidebarLeft}
          />
          <div className="content-right">
            <div className="content-wrapper" style={{ height: '100%' }}>
              <div className="content-body" style={{ height: '100%' }}>
                <div
                  className={classnames('body-content-overlay', {
                    show: userSidebarRight === true || sidebar === true || userSidebarLeft === true,
                  })}
                  onClick={handleOverlayClick}
                ></div>
                <Chat
                  getCurrentConversation={getCurrentConversation}
                  store={store}
                  handleUser={handleUser}
                  handleSidebar={handleSidebar}
                  userSidebarLeft={userSidebarLeft}
                  handleUserSidebarRight={handleUserSidebarRight}
                />
                {/* <UserProfileSidebar
                  user={user}
                  userSidebarRight={userSidebarRight}
                  handleUserSidebarRight={handleUserSidebarRight}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppChat;
