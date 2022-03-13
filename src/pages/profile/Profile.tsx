import BreadCrumbs from '@src/components/breadcrumbs';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { FunctionComponent, useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import ProfileHeader from './ProfileHeader';

import '@styles/react/pages/page-profile.scss';
import { IProfilePage, ProfilePages } from './IProfileProp';
import { IUserModel } from '@src/models/output/authentication/IUserModel';
import LoadingComponent from '@src/components/spinner/LoadingComponent';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reloadUserData } from '@src/redux/reducers/authenticationReducer';
import { APIURL_GET_PROFILE } from '@src/configs/apiConfig/apiUrls';
import { RootStateType } from '@src/redux/Store';

const Profile: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<IProfilePage>(ProfilePages[0]);
  const [userData, setUserData] = useState<IUserModel>();
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const authenticationStore = useSelector((state: RootStateType) => state.authentication);

  const httpRequest = useHttpRequest();

  useEffect(() => {
    httpRequest
      .getRequest<IOutputResult<IUserModel>>(APIURL_GET_PROFILE)
      .then((result) => {
        dispatch(reloadUserData(result));
        setUserData(result.data.data);
      })
      .finally(() => {
        if (!userData) {
          setUserData(authenticationStore.userData);
        }
        setLoadingData(false);
      });
  }, []);

  useEffect(() => {
    document.title = currentPage.title;
  }, [currentPage.title]);

  const changePage = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    setCurrentPage(ProfilePages[pageIndex]);
  };

  return (
    <>
      {!loadingData ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader pageIndex={currentPageIndex} changePage={changePage} data={userData} />
            </Col>
          </Row>
          <section id="profile-info">
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <currentPage.component data={userData} pageIndex={currentPageIndex} changePage={changePage} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </section>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default Profile;
