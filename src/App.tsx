import { useState, memo } from "react";
import { toDoItem } from "./interfaces";
import List from "./components/organism/List";
import { Row, Col, Layout, Typography } from 'antd';
import { MyGlobalContext } from "./utils/ContextAPI";
import CreateToDo from "./components/organism/CreateToDo";
function App() {
  const { Title } = Typography;
  const { Header, Content } = Layout;
  const [toDoList, setToDoList] = useState<Array<toDoItem>>([
    { id: 0, title: "11111111111111", description: "444444444444" },
    { id: 1, title: "222222222222", description: "555555555555" },
    { id: 2, title: "3333333333333", description: "6666666666666" },
  ]);

  const updateOrder = (object: any): void => setToDoList([ ...object ])  
  const addToDo = (object: any): void => setToDoList([object, ...toDoList]);
  const deleteToDo = (id: number): void => setToDoList([...toDoList.filter(e => e.id != id)]);
  const editToDo = (object: any): void => setToDoList([...toDoList.map(e => {
    if(e.id == object.id)
      return object
    else 
      return e
  })]);

  return (
    <MyGlobalContext.Provider value={{ toDoList, addToDo, deleteToDo, editToDo, updateOrder }}>
      <Layout>
        <Header></Header>
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
      </Layout>
    </MyGlobalContext.Provider>
  );
}

export default memo(App);
