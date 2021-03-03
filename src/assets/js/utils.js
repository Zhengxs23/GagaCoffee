import { Toast } from 'vant';

class Utils {
  //验证表单
  validForm(data) {
    //验证表单的数据
    for (let key in data) {
      if (!data[key].reg.test(data[key].value)) {
        //提示
        Toast({
          message: data[key].error,
          forbidClick: true 
        });
        // console.log(data[key].error);
        return false;
      }
    }
    //表单验证通过
    return true;
  }

}

export const utils = new Utils();