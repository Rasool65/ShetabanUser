// ** React Imports
import ReactDOM, { render } from 'react-dom';
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather';

// ** Reactstrap Imports
import { Form, Label, Input, Button, InputGroup, Modal, ModalHeader, FormGroup, FormFeedback } from 'reactstrap';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_CREATE_CONVERSATION, APIURL_SEND_MESSAGE } from '@src/configs/apiConfig/apiUrls';
import { Controller, useForm } from 'react-hook-form';
import { RootStateType } from '@src/redux/Store';
import { IChatLogProps, IChatMessage, IChatMessagesGroup } from './IChat';
import { ICurrentTicket } from '@src/redux/states/ICurrentTicket';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { ISendMessageModel } from '@src/models/output/ticket/IMessagesModel';
import { DateHelper } from '@src/utility/dateHelper';
import { Spinner } from 'reactstrap';
import { IChatNewModel, IChatNewModelSchema } from './../../models/input/chat/IChatModel';
import { yupResolver } from '@hookform/resolvers/yup';

const ChatLog: FunctionComponent<IChatLogProps> = (props) => {
  // ** Props & Store
  const { store, getCurrentConversation, getAllConversations, handleSidebar, showModal, toggleModal, messageIsLoading } = props;
  const { currentTicket } = store;
  const userId = useSelector((state: RootStateType) => state.authentication?.userData?.userRole);
  // ** Refs & Dispatch
  const chatArea = useRef<HTMLDivElement>(null);

  // ** State
  const [msg, setMsg] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false);
  const [sendNewMessageLoading, setSendNewMessageLoading] = useState<boolean>(false);

  const { postRequest } = useHttpRequest();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IChatNewModel>({ mode: 'onSubmit', resolver: yupResolver(IChatNewModelSchema) });

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea && chatArea.current) {
      const chatContainer = ReactDOM.findDOMNode(chatArea.current) as HTMLDivElement;
      chatContainer.scrollTop = Number.MAX_SAFE_INTEGER;
    }
  };

  // ** If ticket is not empty && new message receieved scrollToBottom
  useEffect(() => {
    const messagesLength = currentTicket.length;

    if (messagesLength && !messageIsLoading) {
      scrollToBottom();
    }
  }, [currentTicket, messageIsLoading]);

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog = [];
    chatLog = currentTicket;
    const formattedChatLog: Array<IChatMessagesGroup> = [];

    let chatMessageSenderId = chatLog.length > 0 && chatLog[0].adminUserId ? 'admin' : 'user';
    let msgGroup: IChatMessagesGroup = {
      senderId: chatMessageSenderId,
      messages: [],
    };

    chatLog.length > 0 &&
      chatLog.forEach((chatItem: ICurrentTicket, index: number) => {
        if ((chatItem.adminUserId && chatMessageSenderId === 'admin') || (chatItem.userId && chatMessageSenderId === 'user')) {
          msgGroup?.messages?.push({
            msg: chatItem.message,
            date: DateHelper.isoDateTopersian(chatItem.createOn),
            time: DateHelper.splitTime(chatItem.createOn),
          });
        } else {
          chatMessageSenderId = chatItem.adminUserId ? 'admin' : 'user';
          formattedChatLog.push(msgGroup);
          msgGroup = {
            senderId: chatItem.adminUserId ? 'admin' : 'user',
            messages: [
              {
                msg: chatItem.message,
                date: DateHelper.isoDateTopersian(chatItem.createOn),
                time: DateHelper.splitTime(chatItem.createOn),
              },
            ],
          };
        }
        if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
      });
    return formattedChatLog;
  };

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.senderId === 'admin',
          })}
        >
          <div className="chat-body">
            {item?.messages?.map((chat: any, index: number) => {
              return (
                <div key={index + '_chat'} className="chat-content">
                  <p className="msg">{chat.msg}</p>
                  <div className="time-container">
                    <span>{chat.date}</span>
                    <span>{chat.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  // ** Sends New Msg
  const handleSendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.length && !sendMessageLoading) {
      setSendMessageLoading(true);
      setMsg('');
      postRequest<IOutputResult<ISendMessageModel>>(APIURL_SEND_MESSAGE, {
        conversationId: currentTicket[0].conversationId,
        message: msg,
      })
        .then(() => {
          getCurrentConversation(currentTicket[0].conversationId);
        })
        .finally(() => {
          setSendMessageLoading(false);
        });
    }
  };

  const onSubmit = (data: any) => {
    if (sendNewMessageLoading) return;
    setSendNewMessageLoading(true);
    postRequest(APIURL_CREATE_CONVERSATION, data)
      .then((result) => {
        getAllConversations();
        toggleModal();
      })
      .finally(() => {
        reset();
        setSendNewMessageLoading(false);
      });
  };

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = currentTicket.length > 0 ? PerfectScrollbar : 'div';
  return (
    <div className="chat-app-window">
      <Modal
        toggle={() => {
          toggleModal();
        }}
        isOpen={showModal}
      >
        <ModalHeader>ایجاد پیام جدید</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>عنوان</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <>
                  <Input invalid={errors.title && true} placeholder="عنوان پیام" autoComplete="off" autoFocus={true} {...field} />
                  <FormFeedback>{errors.title?.message}</FormFeedback>
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
                  <Input
                    invalid={errors.message && true}
                    type="textarea"
                    placeholder="متن پیام"
                    autoComplete="off"
                    autoFocus={false}
                    {...field}
                  />
                  <FormFeedback>{errors.message?.message}</FormFeedback>
                </>
              )}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            {sendNewMessageLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : 'ایجاد'}
          </Button>
          {!sendNewMessageLoading && (
            <Button onClick={() => toggleModal()} type="button" style={{ margin: '0 20px' }} color="primary">
              لغو
            </Button>
          )}
        </Form>
      </Modal>
      <div className={classnames('start-chat-area', { 'd-none': currentTicket.length > 0 })}>
        <a
          onClick={() => {
            toggleModal();
          }}
          className="start-chat-icon mb-1"
        >
          <MessageSquare />
        </a>

        <h4
          onClick={() => {
            toggleModal();
          }}
          className="sidebar-toggle start-chat-text"
        >
          ایجاد پیام جدید
        </h4>
      </div>
      <div className={classnames('active-chat', { 'd-none': !currentTicket.length })}>
        <div className="chat-navbar">
          <header className="chat-header">
            <div className="d-flex align-items-center">
              <div className="sidebar-toggle d-block d-lg-none me-1" onClick={handleSidebar}>
                <Menu size={21} />
              </div>
            </div>
          </header>
        </div>
        {messageIsLoading ? (
          <div style={{ display: 'flex' }}>
            <Spinner style={{ margin: '200px auto' }} />
          </div>
        ) : (
          <>
            <ChatWrapper ref={chatArea} className="user-chats" options={{ wheelPropagation: true }}>
              {formattedChatData().length > 0 ? <div className="chats">{renderChats()}</div> : null}
            </ChatWrapper>

            <Form className="chat-app-form" onSubmit={(e) => handleSendMsg(e)}>
              <InputGroup className="input-group-merge me-1 form-send-message">
                <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="پیام خود را وارد کنید..." />
              </InputGroup>

              <Button className="send" color="primary">
                {sendMessageLoading ? <Spinner style={{ width: '1rem', height: '1rem' }} /> : <Send size={14} />}
              </Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatLog;
