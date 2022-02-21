import { createSlice } from '@reduxjs/toolkit';
import { IGeneralInformationState } from '../states/IGeneralInformationState';

export const generalInformationSlice = createSlice({
  name: 'generalInformation',
  initialState: {
    email: 'info@shetabanlogistics.com',
    tel1: '021-88545236',
    address: 'تهران - خیابان قنبرزاده - میدان دوازدهم نیلوفر پلاک 16',
    description:
      ' شرکت حمل و نقل سراسری شتابان شمال در سال ۱۳۸۷ با هدف ارتقای کمی و کیفی خدمات حمل و نقل در گروه سولیکو تاسیس شد  این شرکت پیمانکار انحصاری حمل محصولات هلدینگ سولیکو – کاله است.',
  } as IGeneralInformationState,
  reducers: {
    loadGeneralInformation: (state, action) => {
      var result = action.payload;
      state = result.data.data;
    },
  },
});

export const { loadGeneralInformation } = generalInformationSlice.actions;

export default generalInformationSlice.reducer;
