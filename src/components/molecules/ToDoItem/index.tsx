import { memo, useState } from 'react';
import { useGlobalContext } from "utils/ContextAPI";
import { List,  Skeleton, Input, Row, Col, Button } from 'antd';
import { contextContain, toDoItem, toDoItemWithOutId, InputEvent } from "interfaces";


function ToDoItemComponent({ id, title, description }: toDoItem) {
    const [ isEditable, setEditable ] = useState(false);
    const [ info, setInfo ] = useState<toDoItemWithOutId>({ title, description });
    const handleChange = (event: InputEvent) => setInfo({ ...info, [event.target.name]: event.target.value })
    const { deleteToDo, editToDo }: contextContain = useGlobalContext();

    return (
        <List.Item
            actions={[
            <Button 
                danger
                key="list-loadmore-edit" 
                onClick={() => {
                    if(!isEditable) {
                        setEditable(true)
                    } else {
                        editToDo({ id, ...info})
                        setEditable(false)
                    }
                    
                }}
            >
                { isEditable ? "Save" : "Edit"}
            </Button>, 
            <Button key="list-loadmore-delete" danger onClick={() => deleteToDo(id)}>Delete</Button>
            ]}
        >
            <Skeleton avatar  loading={false} active>
                {
                    isEditable ? (
                        <Row gutter={[8,8]}>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>
                                        Title
                                    </Col>
                                    <Col span={18}>
                                        <Input placeholder="Title" name="title" value={info.title} onChange={handleChange} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>
                                        Description
                                    </Col>
                                    <Col span={18}>
                                        <Input placeholder="Description" name="description" value={info.description} onChange={handleChange} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <List.Item.Meta
                            title={<a href="https://ant.design">{title}</a>}
                            description={description}
                        />
                    )
                }
            </Skeleton>
            
        </List.Item>
    )
}

export default memo(ToDoItemComponent);