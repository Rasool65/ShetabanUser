// ** React Imports
import { useState, useEffect, FunctionComponentFactory, FunctionComponent } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { useDispatch } from 'react-redux';

// ** Utils

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { X, Search, CheckSquare, Bell, User, Trash, Send } from 'react-feather';

// ** Reactstrap Imports
import { CardText, InputGroup, InputGroupText, Badge, Input, Button, Label } from 'reactstrap';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_GET_CONVERSATIONS, APIURL_GET_MESSAGES } from '@src/configs/apiConfig/apiUrls';
import { handleAllTickets, handleCurrentTicket, handleNewMessageCount } from '@src/redux/reducers/ticketReducer';
import { ITicket } from '@src/redux/states/ITickets';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { IGetMessagesModel } from '@src/models/output/ticket/IMessagesModel';
import { ISidebarProps } from './IChat';
import { DateHelper } from '@src/utility/dateHelper';
import { IConversationModel } from '@src/models/output/ticket/IConversationModel';
import { APIURL_NEW_MESSAGE_COUNT } from '@src/configs/apiConfig/apiUrls';
import { number } from 'yup/lib/locale';
const SidebarLeft: FunctionComponent<ISidebarProps> = (props) => {
  // ** Props & Store
  const { sidebar, handleSidebar, store, toggleModel, showModal, handleMessageIsLoading } = props;
  const { tickets } = store;
  const [readMessageList, setReadMessageList] = useState<number[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<number>(-1);

  // ** Dispatch
  const dispatch = useDispatch();

  // ** State
  const [active, setActive] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');

  const { getRequest, postRequest } = useHttpRequest();

  // ** Handles User Chat Click
  const handleUserClick = (id: number) => {
    if (currentConversationId === id) return;
    setCurrentConversationId(id);

    handleMessageIsLoading(true);
    if (!readMessageList.includes(id)) setReadMessageList((o) => [...o, id]);

    getRequest<IOutputResult<IGetMessagesModel>>(APIURL_GET_MESSAGES, undefined, {
      params: {
        page: 990,
        limit: 100,
        conversationId: id,
      },
    })
      .then((result) => {
        dispatch(handleCurrentTicket(result.data.data));
        getRequest<IOutputResult<IConversationModel>>(APIURL_NEW_MESSAGE_COUNT).then((resp) => {
          dispatch(handleNewMessageCount(resp.data.data));
        });
      })
      .finally(() => {
        handleMessageIsLoading(false);
      });
    // dispatch(selectChat(id));
    setActive(id);
    if (sidebar === true) {
      handleSidebar();
    }
  };
  const getTicketList = (value: string) => {
    getRequest<IOutputResult<IConversationModel>>(APIURL_GET_CONVERSATIONS, undefined, {
      params: {
        page: 1,
        limit: 100,
        search: value.trim().length > 0 ? value : undefined,
      },
    }).then((result) => {
      console.log(result.data.data);
      dispatch(handleAllTickets(result.data.data));
    });
  };

  const handleChangeSearch = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    getTicketList(value);
  };

  // ** Renders Chat
  const renderTickets = () => {
    if (tickets && tickets.length) {
      return tickets.slice(0).map((item: ITicket) => {
        return (
          <li
            key={item.id}
            onClick={() => handleUserClick(item.id)}
            className={classnames({
              active: active === item.id,
            })}
          >
            {/* <Avatar img={item.avatar} imgHeight="42" imgWidth="42" status={item.status} /> */}
            <div className="chat-info flex-grow-1">
              <h5 className="mb-0">
                {`${item.title} `}
                {item.notSeenMessagesCount > 0 && !readMessageList.includes(item.id) && (
                  <Badge color="danger" pill>
                    {item.notSeenMessagesCount}
                  </Badge>
                )}
              </h5>

              <CardText className="text-truncate">{item.lastMessage}</CardText>
            </div>
            <div className="time-container">
              <CardText>{DateHelper.isoDateTopersian(item.createOn)}</CardText>
              <CardText>{DateHelper.splitTime(item.createOn)}</CardText>
            </div>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  return store ? (
    <div className="sidebar-left">
      <div className="sidebar">
        <div
          className={classnames('sidebar-content', {
            show: sidebar === true,
          })}
        >
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <Input className="round" onChange={handleChangeSearch} value={searchValue} placeholder="جست و جو ..." />
              <Button color="primary" onClick={() => toggleModel()}>
                <span className="">+</span>
              </Button>
            </div>
          </div>
          <PerfectScrollbar className="chat-user-list-wrapper list-group" options={{ wheelPropagation: false }}>
            <h3 className="chat-list-title">لیست پیام ها </h3>
            <ul className="chat-users-list chat-list media-list">{renderTickets()}</ul>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null;
};

export default SidebarLeft;
