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

class PCHeader extends React.Component {
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

  handleSubmit(e) {
    //开始提交数据;
    e.preventDefault(); // TODO: ???
    var myFetchOptions = {
      method: "GET"
    };
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=userName&password=password&r_userName=" +
      formData.r_userName + "&r_password=" +
      formData.r_password + "&r_confirmPassword=" +
      formData.r_confirmPassword, myFetchOptions).
      then(response => response.json()).then(json => {
        this.setState({ userNickName: json.NickUserName, userid: json.UserId });

      });
    message.success("请求成功！");
    this.setModalVisible(false);

  };
  callback(key) {
    if (key == "1") {
      this.setState({ action: "login" })
    } else if (key == "2") {
      this.setState({ action: "register" })
    }
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined ?
      <Menu.Item key="logout" className="register">
        <Button type="primary" htmlType="button">this.state.userNickName</Button>
        &nbsp;&nbsp;
      <Link target="_blank">个人中心</Link>
        <Button type="ghost" htmlType="button">退出</Button>
      </Menu.Item>
      :
      <Menu.Item key="register" classsName="register">
        <Icon type="appstore" />注册/登录
    </Menu.Item>
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src="./src/images/logo.png" alt="logo" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Icon type="appstore" />头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />社会
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />国内
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />科技
              </Menu.Item>
              <Menu.Item key="shishan">
                <Icon type="appstore" />时尚
              </Menu.Item>
              {userShow}

            </Menu>
            <Modal title="用户中心" wrapClassName="vertical-center" visible={this.state.modalVlsible}
              onCancel={() => { this.setModalVisible(false) }}
              onOk={() => this.setModalVisible(false)} okText="关闭">
              <Tabs type="card" onChange={this.callback.bind(this)}>
                <TabPane tab="登录" key="1">
                  <Form horizontal="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="账户">
                      {getFieldDecorator('username')(
                        <Input placeholder="请输入您的账号" />
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('password')(
                        <Input type="password" placeholder="请输入您的密码"  />
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </TabPane>
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
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}

export default PCHeader = Form.create({})(PCHeader); //TODO 二次封装？？？？