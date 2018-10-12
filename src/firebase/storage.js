
import { st } from './firebase';

export const doGetArticlesImg = (image) =>
  st.ref().child(`/images/articles/${image}`).getDownloadURL();
