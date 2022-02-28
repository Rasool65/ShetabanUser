import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton } from '@src/components/customButton';
import { CustomFormGroup } from '@src/components/form/CustomFormGroup';
import LoadingComponent from '@src/components/spinner/LoadingComponent';
import { APIURL_GET_PROFILE, APIURL_UPDATE_PROFILE } from '@src/configs/apiConfig/apiUrls';
import IPageProps from '@src/configs/routerConfig/IPageProps';
import { URL_PROFILE } from '@src/configs/urls';
import useHttpRequest, { RequestDataType } from '@src/hooks/useHttpRequest';
import { useToast } from '@src/hooks/useToast';
import { IProfileUpdateModel, ProfileUpdateModelSchema } from '@src/models/input/profile/IProfileUpdateModel';
import { IUserModel } from '@src/models/output/authentication/IUserModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { reloadUserData } from '@src/redux/reducers/authenticationReducer';
import { FunctionComponent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';

import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { BASE_URL } from '@src/configs/apiConfig/apiBaseUrl';

export const ProfileEdit: FunctionComponent<IPageProps> = (props) => {
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUserModel>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();
  const httpRequestFormData = useHttpRequest(RequestDataType.formData);
  const toast = useToast();

  useEffect(() => {
    httpRequest
      .getRequest<IOutputResult<IUserModel>>(APIURL_GET_PROFILE, function () {
        toast.showError('امکان لود اطلاعات پروفایل وجود ندارد');
        navigate(URL_PROFILE);
      })
      .then((result) => {
        setUserData(result.data.data);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, []);

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileUpdateModel>({ mode: 'onChange', resolver: yupResolver(ProfileUpdateModelSchema) });

  const onSubmit = (data: IProfileUpdateModel) => {
    if (data) {
      setLoading(true);

      var formData = new FormData();
      if (avatarFile) formData.append('avatarPic', avatarFile);
      if (data.email) formData.append('email', data.email);
      formData.append('isAvatarRemoved', deleteAvatar.toString());
      formData.append('profile.firstName', data.profile.firstName);
      formData.append('profile.lastName', data.profile.lastName);
      if (data.profile.nationalCode) formData.append('profile.nationalCode', data.profile.nationalCode);
      formData.append('profile.userGender', data.profile.userGender ? data.profile.userGender.toString() : '0');

      httpRequestFormData
        .updateRequest<IOutputResult<IUserModel>>(APIURL_UPDATE_PROFILE, formData)
        .then((result) => {
          dispatch(reloadUserData(result));
          toast.showSuccess('پروفایل شما با موفقیت بروز شد');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const [avatar, setAvatar] = useState<any>(BASE_URL + userData?.profile?.avatar || defaultAvatar);
  const [avatarFile, setAvatarFile] = useState<any>();
  const [deleteAvatar, setDeleteAvatar] = useState<boolean>(false);

  const onImageFileChange = (e: any) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setAvatar(reader.result);
    };
    setAvatarFile(files[0]);
    setDeleteAvatar(false);
    reader.readAsDataURL(files[0]);
  };

  const handleImgReset = () => {
    setAvatar(defaultAvatar);
    setDeleteAvatar(true);
  };

  return (
    <>
      {!loadingData ? (
        <Card>
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <div className="d-flex mb-3">
                  <div className="me-25">
                    <img className="rounded me-50" src={avatar} height="100" width="100" />
                  </div>
                  <div className="d-flex align-items-end mt-75 ms-1">
                    <div>
                      <Button tag={Label} className="mb-75 me-75" size="sm" color="primary">
                        انتخاب تصویر
                        <Input type="file" onChange={onImageFileChange} hidden accept="image/*" />
                      </Button>
                      <Button className="mb-75" color="danger" size="sm" outline onClick={handleImgReset}>
                        حذف
                      </Button>
                      <p className="mb-0">فایل به فرمت های JPG, GIF or PNG. با حداکثر سایز 800kB</p>
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <CustomFormGroup col={6} label={'شماره موبایل'}>
                  <Input type="text" disabled={true} autoComplete="off" value={userData?.mobile} />
                </CustomFormGroup>
              </Row>
              <Row>
                <CustomFormGroup col={6} label={'کد ملی'}>
                  <Controller
                    control={control}
                    name="profile.nationalCode"
                    defaultValue={userData?.profile?.nationalCode || ''}
                    render={({ field }) => (
                      <>
                        <Input
                          type="number"
                          invalid={errors.profile?.nationalCode && true}
                          placeholder="کد ملی"
                          autoComplete="off"
                          {...field}
                        />
                        <FormFeedback>{errors.profile?.nationalCode?.message}</FormFeedback>
                      </>
                    )}
                  />{' '}
                </CustomFormGroup>
                <CustomFormGroup col={6} label={'پست الکترونیک'}>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue={userData?.email || ''}
                    render={({ field }) => (
                      <>
                        <Input
                          type="email"
                          invalid={errors.email && true}
                          placeholder="example@gmail.com"
                          autoComplete="off"
                          {...field}
                        />
                        <FormFeedback>{errors.email?.message}</FormFeedback>
                      </>
                    )}
                  />{' '}
                </CustomFormGroup>
              </Row>
              <Row>
                <CustomFormGroup col={6} label={'جنسیت'}>
                  <Controller
                    control={control}
                    name="profile.userGender"
                    defaultValue={userData?.profile?.userGender || 0}
                    render={({ field }) => (
                      <>
                        <Input type="select" {...field}>
                          <option value={0}>خانم</option>
                          <option value={1}>آقا</option>
                        </Input>
                        <FormFeedback>{errors.profile?.userGender?.message}</FormFeedback>
                      </>
                    )}
                  />
                </CustomFormGroup>
              </Row>
              <Row>
                <CustomFormGroup col={6} label={'نام'}>
                  <Controller
                    control={control}
                    name="profile.firstName"
                    defaultValue={userData?.profile?.firstName}
                    render={({ field }) => (
                      <>
                        <Input
                          type="text"
                          invalid={errors.profile?.firstName && true}
                          placeholder="نام"
                          autoComplete="off"
                          {...field}
                        />
                        <FormFeedback>{errors.profile?.firstName?.message}</FormFeedback>
                      </>
                    )}
                  />
                </CustomFormGroup>
                <CustomFormGroup col={6} label={'نام خانوادگی'}>
                  <Controller
                    control={control}
                    name="profile.lastName"
                    defaultValue={userData?.profile?.lastName}
                    render={({ field }) => (
                      <>
                        <Input
                          type="text"
                          invalid={errors.profile?.lastName && true}
                          placeholder="نام خانوادگی"
                          autoComplete="off"
                          {...field}
                        />
                        <FormFeedback>{errors.profile?.lastName?.message}</FormFeedback>
                      </>
                    )}
                  />
                </CustomFormGroup>
              </Row>
              <CustomButton loading={loading} className="btn btn-success pull-left border-radius mt-3 mb-3">
                ذخیره تغییرات
              </CustomButton>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};
export default ProfileEdit;
