import { memo, useState } from "react";
import { Input, Row, Col, Button } from 'antd';
import { contextContain, toDoItemWithOutId, InputEvent } from "interfaces";
import { useGlobalContext } from "utils/ContextAPI";

function CreateToDo() {
  const { addToDo, toDoList }: contextContain = useGlobalContext();
  const [ info, setInfo ] = useState<toDoItemWithOutId>({ title: "", description: "", status: 'active' });
  const handleChange = (event: InputEvent) => setInfo({ ...info, [event.target.name]: event.target.value })

  return (
    <Row justify="center" gutter={[10,10]}>
      <Col span={24}>
        <Input placeholder="Title" name="title" value={info.title} onChange={handleChange} />
      </Col>
      <Col span={24}>
        <Input placeholder="Description" name="description" value={info.description} onChange={handleChange} />
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={() => {
          addToDo({id: toDoList.length + 1, ...info})
          setInfo({title: "", description: ""})
        }}>
            Create
        </Button>
      </Col>
    </Row>
  );
}

export default memo(CreateToDo);
