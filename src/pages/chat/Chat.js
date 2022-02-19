// ** React Imports
import ReactDOM, { render } from 'react-dom';
import { useState, useEffect, useRef } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { sendMsg } from './store';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather';

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  FormGroup,
} from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_CREATE_CONVERSATION, APIURL_SEND_MESSAGE } from '@src/configs/apiConfig/apiUrls';
import { Controller, useForm } from 'react-hook-form';

const ChatLog = (props) => {
  // ** Props & Store
  const { handleUser, handleUserSidebarRight, handleSidebar, store, userSidebarLeft, getCurrentConversation } = props;
  const { currentTicket } = store;
  const userId = useSelector((store) => store.authentication.userData.userRole);
  // ** Refs & Dispatch
  const chatArea = useRef(null);
  const dispatch = useDispatch();

  // ** State
  const [msg, setMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { postRequest } = useHttpRequest();
  const { control, handleSubmit } = useForm();

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current);
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  // ** If user chat is not empty scrollToBottom
  // useEffect(() => {
  //   const selectedUserLen = Object.keys(selectedUser).length;

  //   if (selectedUserLen) {
  //     scrollToBottom();
  //   }
  // }, [selectedUser]);

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog = [];
    chatLog = currentTicket;
    const formattedChatLog = [];
    let chatMessageSenderId = userId;
    let msgGroup = {
      senderId: chatMessageSenderId,
      messages: [],
    };
    chatLog.length > 0 &&
      chatLog.forEach((msg, index) => {
        if (chatMessageSenderId === msg.userId) {
          console.log(msg);
          msgGroup.messages.push({
            msg: msg.message,
            time: msg.createOn,
          });
        } else {
          chatMessageSenderId = msg.senderId;
          formattedChatLog.push(msgGroup);
          msgGroup = {
            senderId: msg.userId,
            messages: [
              {
                msg: msg.message,
                time: msg.time,
              },
            ],
          };
        }
        if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
      });
    return formattedChatLog;
  };

  // ** Renders user chat
  const renderChats = () =>
    formattedChatData().map((item, index) => {
      console.log(item.messages);
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.senderId !== userId,
          })}
        >
          {/* <div className="chat-avatar">
              <Avatar
                imgWidth={36}
                imgHeight={36}
                className="box-shadow-1 cursor-pointer"
                img={item.senderId === 11 ? userProfile.avatar : selectedUser.contact.avatar}
              />
            </div> */}

          <div className="chat-body">
            {item.messages.map((chat, index) => (
              <div key={index + '_chat'} className="chat-content">
                <p>{chat.msg}</p>
              </div>
            ))}
          </div>
        </div>
      );
    });

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = (obj) => {
    handleUserSidebarRight();
    handleUser(obj);
  };

  // ** On mobile screen open left sidebar on Start Conversation Click
  // const handleStartConversation = () => {
  //   if (!Object.keys(selectedUser).length && !userSidebarLeft && window.innerWidth < 992) {
  //     handleSidebar();
  //   }
  // };

  // ** Sends New Msg
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msg.length) {
      postRequest(APIURL_SEND_MESSAGE, {
        conversationId: currentTicket[0].conversationId,
        message: msg,
      }).then(() => {
        setMsg('');
        getCurrentConversation();
      });
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(2134234);
  };
  const onSubmit = (data) => {
    postRequest(APIURL_CREATE_CONVERSATION, data).then((result) => {
      toggleModal();
    });
  };

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = currentTicket.length > 0 ? PerfectScrollbar : 'div';
  return (
    <div className="chat-app-window">
      <Modal toggle={toggleModal} isOpen={showModal}>
        <ModalHeader>ایجاد تیکت جدید</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>عنوان</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <>
                  <Input type="text" placeholder="عنوان تیکت" autoComplete="off" autoFocus={true} {...field} />
                </>
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label>پیام</Label>
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <>
                  <Input type="text" placeholder="متن تیکت" autoComplete="off" autoFocus={false} {...field} />
                </>
              )}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            ایجاد
          </Button>
        </Form>
      </Modal>
      <div onClick={toggleModal} className={classnames('start-chat-area', { 'd-none': currentTicket.length > 0 })}>
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>

        <h4 className="sidebar-toggle start-chat-text">ایجاد تیکت جدید</h4>
      </div>
      <div className={classnames('active-chat', { 'd-none': !currentTicket.length })}>
        <div className="chat-navbar">
          <header className="chat-header">
            <div className="d-flex align-items-center">
              <div className="sidebar-toggle d-block d-lg-none me-1" onClick={handleSidebar}>
                <Menu size={21} />
              </div>
              <Avatar
                imgHeight="36"
                imgWidth="36"
                // img={selectedUser.contact.avatar}
                // status={selectedUser.contact.status}
                // className="avatar-border user-profile-toggle m-0 me-1"
                // onClick={() => handleAvatarClick(selectedUser.contact)}
              />
              {/* <h6 className="mb-0">{selectedUser.contact.fullName}</h6> */}
            </div>
            <div className="d-flex align-items-center">
              {/* <PhoneCall size={18} className="cursor-pointer d-sm-block d-none me-1" />
              <Video size={18} className="cursor-pointer d-sm-block d-none me-1" />
              <Search size={18} className="cursor-pointer d-sm-block d-none" />
              <UncontrolledDropdown className="more-options-dropdown">
                <DropdownToggle className="btn-icon" color="transparent" size="sm">
                  <MoreVertical size="18" />
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    View Contact
                  </DropdownItem>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    Mute Notifications
                  </DropdownItem>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    Block Contact
                  </DropdownItem>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    Clear Chat
                  </DropdownItem>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    Report
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </div>
          </header>
        </div>

        <ChatWrapper ref={chatArea} className="user-chats" style={{ overflow: 'scroll' }} options={{ wheelPropagation: true }}>
          {formattedChatData().length > 0 ? <div className="chats">{renderChats()}</div> : null}
        </ChatWrapper>

        <Form className="chat-app-form" onSubmit={(e) => handleSendMsg(e)}>
          <InputGroup className="input-group-merge me-1 form-send-message">
            {/* <InputGroupText> <Mic className="cursor-pointer" size={14} /> </InputGroupText> */}
            <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="پیام خود را وارد کنید..." />
            {/* <InputGroupText>
              <Label className="attachment-icon mb-0" for="attach-doc">
                <Image className="cursor-pointer text-secondary" size={14} />
                <input type="file" id="attach-doc" hidden />
              </Label>
            </InputGroupText> */}
          </InputGroup>
          <Button className="send" color="primary">
            <Send size={14} className="d-lg-none" />
            <span className="d-none d-lg-block">ارسال</span>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChatLog;
