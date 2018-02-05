import React from 'react';
import { Row, Col } from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  message,
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: "top",
      modalVlsible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  }

  setModalVisible(value) {
    this.setState({ modalVlsible: value });
  };

  handleClick(e) {
    if (e.key === "register") {
      this.setState({ current: 'register' });
      this.setModalVisible(true);
    }
    else {
      this.setState({ current: e.key });
    }
  };
  login(e){
    this.setModalVisible(true);
  };

  handleSubmit(e) {
    //开始提交数据;
    e.preventDefault(); // TODO: ???
    var myFetchOptions = {
      method: "GET"
    };
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName=" +
      formData.r_userName + "&r_password=" +
      formData.r_password + "&r_confirmPassword=" +
      formData.r_confirmPassword, myFetchOptions).
      then(response => response.json()).then(json => {
        this.setState({ userNickName: json.NickUserName, userid: json.UserId });

      });
    message.success("请求成功！");
    this.setModalVisible(false);

  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined
      ?
      <Link>
        <Icon type="inbox" ></Icon>
      </Link>
      :
      <Icon type="setting" onClick={this.login.bind(this)}></Icon>

    return (
      <div id="mobile-header">
        <header>
          <img src="./src/images/logo.png" />
          <span >ReactNews</span>
          {userShow}
          <Modal title="用户中心" wrapClassName="vertical-center" visible={this.state.modalVlsible}
            onCancel={() => { this.setModalVisible(false) }}
            onOk={() => this.setModalVisible(false)} okText="关闭">
            <Tabs type="card">
              <TabPane tab="注册" key="2">
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                  <FormItem label="账户">
                    {getFieldDecorator('r_username')(
                      <Input placeholder="请输入账户" />
                    )}
                  </FormItem>
                  <FormItem label="密码">
                    {getFieldDecorator('r_password')(
                      <Input type="password" placeholder="请输入密码" />
                    )}
                  </FormItem>
                  <FormItem label="确认密码">
                    {getFieldDecorator('r_confirmPwd')(
                      <Input type="password" placeholder="PasswordConfirm" />
                    )}
                  </FormItem>
                  <Button type="primary" htmlType="submit">注册</Button>
                </Form>
              </TabPane>
              <TabPane tab="登录" key="1">

              </TabPane>
            </Tabs>
          </Modal>
        </header>
      </div>
    );
  }
}

export default MobileHeader = Form.create({})(MobileHeader);