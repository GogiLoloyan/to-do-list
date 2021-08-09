import { useState, memo } from "react";
import { MyGlobalContext } from "./utils/ContextAPI";
import CreateToDo from "./components/organism/CreateToDo";
import List from "./components/organism/List";
import { toDoItem } from "./interfaces";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Typography } from 'antd';



function App() {
  const { Title } = Typography;
  const { Header, Footer, Sider, Content } = Layout;
  const [toDoList, setToDoList] = useState<Array<toDoItem>>([
    { id: 1, title: "my first task", description: "wake up" },
    { id: 2, title: "my second task", description: "watch tuf" },
    { id: 3, title: "my third task", description: "dead" },
  ]);
  const addToDo = (object: any): void => setToDoList([object, ...toDoList]);
  const deleteToDo = (id: number): void => setToDoList([...toDoList.filter(e => e.id != id)]);
  const editToDo = (object: any): void => setToDoList([...toDoList.map(e => {
    if(e.id = object.id)
      return object
    else 
      return e
  })]);

  return (
    <MyGlobalContext.Provider value={{ toDoList, addToDo, deleteToDo, editToDo }}>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Title>To Do List</Title>
          <Row justify="center" gutter={[8,8]}>
            <Col span={24}>
              <Row justify="center" gutter={[8,8]}>
                <Col span={12}>
                  <CreateToDo />  
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="center" gutter={[8,8]}>
                <Col span={12}>
                  <List />
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </MyGlobalContext.Provider>
  );
}

export default memo(App);
