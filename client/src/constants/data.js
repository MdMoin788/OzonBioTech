import img1 from "./images/img1.png"
import img2 from "./images/img2.png"
import img3 from "./images/img3.png"
import img4 from "./images/img4.png"


export const homeSlider = [
  { url: img1 },
  { url: img2 },
  { url: img3 },
  { url: img4 }
]
// export const homeSlider = [
//   { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
//   { url: 'https://plus.unsplash.com/premium_photo-1658506871173-7498f5371ed1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
//   { url: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }
// ]

export const loginFormData = [
  {
    heading: 'Email :',
    type: 'email',
    name: 'email',
    value: '',
    placeholder: 'Enter Your Email'
  },
  {
    heading: 'Password :',
    type: 'password',
    name: 'password',
    value: '',
    placeholder: 'Enter Your Password'
  },
]
export const registerFormData = [
  {
    heading: 'Name :',
    type: 'text',
    name: 'name',
    value: '',
    placeholder: 'Enter Your Name'
  },
  {
    heading: 'Email :',
    type: 'email',
    name: 'email',
    value: '',
    placeholder: 'Enter Your Email'
  },
  {
    heading: 'Password :',
    type: 'password',
    name: 'password',
    value: '',
    placeholder: 'Enter Your Password'
  },

]


export const productCategories = [
  'laptop',
  'tshirt',
  'shirt',
  'pant',
  'mobile',
]

export const toastOption = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
}