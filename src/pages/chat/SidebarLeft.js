// ** React Imports
import { useState, useEffect } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { selectChat } from './store';
import { useDispatch } from 'react-redux';

// ** Utils
import { formatDateToMonthShort, isObjEmpty } from '@utils';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { X, Search, CheckSquare, Bell, User, Trash } from 'react-feather';

// ** Reactstrap Imports
import { CardText, InputGroup, InputGroupText, Badge, Input, Button, Label } from 'reactstrap';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_GET_MESSAGES } from '@src/configs/apiConfig/apiUrls';
import { handleCurrentTicket } from '@src/redux/reducers/ticketReducer';
const SidebarLeft = (props) => {
  // ** Props & Store
  const { store, sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft } = props;
  const { tickets, userProfile, currentTicket } = store;

  // ** Dispatch
  const dispatch = useDispatch();

  // ** State
  const [query, setQuery] = useState('');
  const [about, setAbout] = useState('');
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('online');
  const [filteredChat, setFilteredChat] = useState([]);
  // const [filteredContacts, setFilteredContacts] = useState([]);

  const { getRequest, postRequest } = useHttpRequest();

  // ** Handles User Chat Click
  const handleUserClick = (id) => {
    console.log(id);
    postRequest(APIURL_GET_MESSAGES, {
      page: 9999,
      limit: 100,
      search: '',
      conversationId: id,
    }).then((result) => {
      dispatch(handleCurrentTicket(result.data.data));
    });
    dispatch(selectChat(id));
    setActive(id);
    if (sidebar === true) {
      handleSidebar();
    }
  };

  // useEffect(() => {
  //   if (!isObjEmpty(store.selectedUser)) {
  //     if (store.selectedUser.chat) {
  //       setActive(store.selectedUser.chat.id);
  //     } else {
  //       setActive(store.selectedUser.contact.id);
  //     }
  //   }
  // }, []);

  // ** Renders Chat
  const renderTickets = () => {
    if (tickets && tickets.length) {
      console.log(tickets);
      if (query.length && !filteredChat.length) {
        return (
          <li className="no-results show">
            <h6 className="mb-0">No Chats Found</h6>
          </li>
        );
      } else {
        const arrToMap = query.length && filteredChat.length ? filteredChat : tickets;

        return arrToMap.map((item) => {
          // const time = formatDateToMonthShort(item.chat.lastMessage ? item.chat.lastMessage.time : new Date());

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
                <h5 className="mb-0">{item.title}</h5>
                <CardText className="text-truncate">
                  {/* {item.chat.lastMessage ? item.chat.lastMessage.message : chats[chats.length - 1].message} */}
                </CardText>
              </div>
              {/* <div className="chat-meta text-nowrap">
                <small className="float-end mb-25 chat-time ms-25">{12}</small>
                {
                  item.chat.unseenMsgs >= 1 ? (
                    <Badge className="float-end" color="danger" pill>
                      {{ item.chat.unseenMsgs }}
                    </Badge>
                  ) : null
                }
                
              </div> */}
            </li>
          );
        });
      }
    } else {
      return null;
    }
  };

  // ** Renders Contact
  // const renderContacts = () => {
  //   if (contacts && contacts.length) {
  //     if (query.length && !filteredContacts.length) {
  //       return (
  //         <li className="no-results show">
  //           <h6 className="mb-0">No Chats Found</h6>
  //         </li>
  //       );
  //     } else {
  //       const arrToMap = query.length && filteredContacts.length ? filteredContacts : contacts;
  //       return arrToMap.map((item) => {
  //         return (
  //           <li key={item.fullName} onClick={() => handleUserClick(item.id)}>
  //             <Avatar img={item.avatar} imgHeight="42" imgWidth="42" />
  //             <div className="chat-info flex-grow-1">
  //               <h5 className="mb-0">{item.fullName}</h5>
  //               <CardText className="text-truncate">{item.about}</CardText>
  //             </div>
  //           </li>
  //         );
  //       });
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  // ** Handles Filter
  const handleFilter = (e) => {
    setQuery(e.target.value);
    const searchFilterFunction = (contact) => contact.fullName.toLowerCase().includes(e.target.value.toLowerCase());
    const filteredChatsArr = chats.filter(searchFilterFunction);
    const filteredContactssArr = contacts.filter(searchFilterFunction);
    setFilteredChat([...filteredChatsArr]);
    setFilteredContacts([...filteredContactssArr]);
  };

  const renderAboutCount = () => {
    if (userProfile && userProfile.about && userProfile.about.length && about.length === 0) {
      return userProfile.about.length;
    } else {
      return about.length;
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
          <div className="sidebar-close-icon" onClick={handleSidebar}>
            <X size={14} />
          </div>
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              {/* <div className="sidebar-profile-toggle" onClick={handleUserSidebarLeft}>
                {Object.keys(userProfile).length ? (
                  <Avatar className="avatar-border" img={userProfile.avatar} status={status} imgHeight="42" imgWidth="42" />
                ) : null}
              </div> */}
              <InputGroup className="input-group-merge  w-100">
                <Input value={query} className="round" placeholder="جست و جو ..." onChange={handleFilter} />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar className="chat-user-list-wrapper list-group" options={{ wheelPropagation: false }}>
            <h3 className="chat-list-title">لیست تیکت ها </h3>
            <ul className="chat-users-list chat-list media-list">{renderTickets()}</ul>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  ) : null;
};

export default SidebarLeft;
