// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Chat App Component Imports
import Chat from './Chat';
import Sidebar from './SidebarLeft';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

import { IOutputResult } from '@src/models/output/IOutputResult';

import '@styles/base/pages/app-chat.scss';
import '@styles/base/pages/app-chat-list.scss';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_GET_CONVERSATIONS, APIURL_GET_MESSAGES } from '@src/configs/apiConfig/apiUrls';
import { handleAllTickets, handleCurrentTicket } from '@src/redux/reducers/ticketReducer';
import { IConversationModel } from '@src/models/output/ticket/IConversationModel';
import { IGetMessagesModel } from '@src/models/output/ticket/IMessagesModel';
import { ITicketReducerState } from '@src/redux/states/ITicketReducerState';
import { RootStateType } from '@src/redux/Store';
import { AxiosRequestConfig } from 'axios';

const AppChat = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state: RootStateType) => state.ticket);
  const { currentTicket } = store;
  // ** States
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [userSidebarRight, setUserSidebarRight] = useState<boolean>(false);
  const [userSidebarLeft, setUserSidebarLeft] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [messageIsLoading, setMessageIsLoading] = useState<boolean>(false);

  const httpRequest = useHttpRequest();

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar);
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft);
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight);
  const handleOverlayClick = () => {
    setSidebar(false);
    setUserSidebarRight(false);
    setUserSidebarLeft(false);
  };


  useEffect(() => {
    getAllConversations();
  }, []);

  const getAllConversations = () => {
    httpRequest
      .getRequest<IOutputResult<IConversationModel>>(APIURL_GET_CONVERSATIONS, undefined, {
        params: {
          page: 1,
          limit: 100,
        },
      })
      .then((result) => {
        dispatch(handleAllTickets(result.data.data));
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const getCurrentConversation = (id: number) => {
    httpRequest
      .getRequest<IOutputResult<IGetMessagesModel>>(APIURL_GET_MESSAGES, undefined, {
        params: {
          page: 9999,
          limit: 100,
          conversationId: id,
        },
      })
      .then((result) => {
        dispatch(handleCurrentTicket(result.data.data));
      });
  };

  const handleIsMessageLoading = (status: boolean) => setMessageIsLoading(status);

  return (
    <div className="chat-application ">
      <div className="content-area-wrapper">
        <Sidebar
          handleMessageIsLoading={handleIsMessageLoading}
          handleSidebar={handleSidebar}
          store={store}
          sidebar={sidebar}
          toggleModel={toggleModal}
          showModal={showModal}
          // getCurrentConversation={getCurrentConversation}
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
                messageIsLoading={messageIsLoading}
                getCurrentConversation={getCurrentConversation}
                store={store}
                toggleModal={toggleModal}
                showModal={showModal}
                handleSidebar={handleSidebar}
                getAllConversations={getAllConversations}
                // handleUserSidebarRight={handleUserSidebarRight}
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
  );
};

export default AppChat;
