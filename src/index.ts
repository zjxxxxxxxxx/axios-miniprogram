/*
 * @Author: early-autumn
 * @Date: 2020-04-14 23:22:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-15 16:56:41
 */
import axios from './axios';

interface Test {
  test1: string;
  test2: string;
  test3: string;
}

axios<Test>('/test').then((res) => {
  console.log(res.data.test3);
});

axios<Test>({ url: '' }).then((res) => {
  console.log(res.data.test1);
});

axios
  .request<Test>({ url: '' })
  .then((res) => {
    console.log(res.data.test1);
  });

axios.get<Test>('', {}, {}).then((res) => {
  console.log(res.data.test1);
});

// axios.post<string>('', {}, {}).then((res) => {
//   console.log(res.data);
// });
