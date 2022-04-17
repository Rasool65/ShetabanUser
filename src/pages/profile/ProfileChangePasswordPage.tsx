import { yupResolver } from '@hookform/resolvers/yup';
import { APIURL_UPDATE_PROFILE_PASSWORD } from '@src/configs/apiConfig/apiUrls';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { IProfileChangePasswordModel, IProfileChangePasswordSchema } from '@src/models/input/profile/IProfileChangePasswordModel';
import { IChangePasswordModel } from '@src/models/output/authentication/IUserProfileModel';
import { IOutputResult } from '@src/models/output/IOutputResult';
import { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, Input, Row } from 'reactstrap';
import { useToast } from '@src/hooks/useToast';
import { CustomFormGroup } from '@src/components/form/CustomFormGroup';
import { API_BASE_URL } from './../../configs/apiConfig/apiBaseUrl';

export const ProfileChangePasswordPage: FunctionComponent = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const httpRequest = useHttpRequest();
  const toast = useToast();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileChangePasswordModel>({ mode: 'onChange', resolver: yupResolver(IProfileChangePasswordSchema) });

  const onSubmit = (data: IProfileChangePasswordModel) => {
    if (data) {
      setLoading(true);
      httpRequest
        .updateRequest<IOutputResult<IChangePasswordModel>>(`${API_BASE_URL + '/' + APIURL_UPDATE_PROFILE_PASSWORD}`, data)
        .then((result) => {
          toast.showSuccess('تغییر کلمه عبور با موفقیت انجام شد');
          resetForm();
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const resetForm = () => {
    reset({
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
    });
  };
  return (
    <>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">تغییر کلمه عبور</CardTitle>
        </CardHeader>
        <CardBody className="pt-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <CustomFormGroup col={6} label={'کلمه عبور فعلی'}>
                <Controller
                  control={control}
                  name="currentPassword"
                  render={({ field }) => (
                    <Input
                      type="password"
                      visible={false}
                      inputClassName=""
                      className=""
                      focuse={true}
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && <FormFeedback className="d-block">{errors.currentPassword.message}</FormFeedback>}
              </CustomFormGroup>
            </Row>
            <Row>
              <CustomFormGroup col={6} label={'کلمه عبور جدید'}>
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field }) => (
                    <Input
                      type="password"
                      visible={false}
                      inputClassName=""
                      className=""
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && <FormFeedback className="d-block">{errors.newPassword.message}</FormFeedback>}
              </CustomFormGroup>
              <CustomFormGroup col={6} label={'تکرار کلمه عبور جدید'}>
                <Controller
                  control={control}
                  name="reNewPassword"
                  render={({ field }) => (
                    <Input
                      type="password"
                      visible={false}
                      inputClassName=""
                      className=""
                      invalid={errors.reNewPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.reNewPassword && <FormFeedback className="d-block">{errors.reNewPassword.message}</FormFeedback>}
              </CustomFormGroup>
              <Col xs={12}>
                <p className="fw-bolder">موارد پیشنهادی انتخاب کلمه عبور</p>
                <ul className="ps-1 ms-25">
                  <li className="mb-50">حداقل 6 کاراکتر به بالا باشد</li>
                  <li className="mb-50">استفاده از حروف کوچک و بزرگ</li>
                  <li>استفاده از ترکیبی از اعداد ، حروف و علائم خاص</li>
                </ul>
              </Col>
              <Col className="mt-1" sm="12">
                <Button disabled={loading} type="submit" className="me-1" color="primary">
                  اعمال تغییرات
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfileChangePasswordPage;
