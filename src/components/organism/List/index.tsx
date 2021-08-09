import { memo } from "react";
import { Col, Row } from 'antd';
import { contextContain, toDoItem } from "interfaces";
import { useGlobalContext } from "utils/ContextAPI";
import { List, Button, Skeleton } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function ListComponent() {
  const { toDoList, deleteToDo, editToDo }: contextContain = useGlobalContext();

  const getItemStyle = (isDragging: any , draggableStyle: any )=> ({
    userSelect: "none",
    margin: `8px 0`,
    ...draggableStyle,
  });

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={24}>
          <DragDropContext
            onDragEnd={() => {}}
          >
            <Droppable
              droppableId={`droppable`}
            >
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <List
                        className="demo-loadmore-list custom-list"
                        loading={false}
                        itemLayout="horizontal"
                        loadMore={true}
                        dataSource={toDoList}
                        renderItem={({ id, title, description }:toDoItem): any => (
                          <Draggable
                            index={id}
                            key={`item-${id}`}
                            draggableId={`item-${id}`}
                          
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <List.Item
                                      actions={[
                                        <Button key="list-loadmore-edit" danger>Edit</Button>, 
                                        <Button key="list-loadmore-delete" danger onClick={() => deleteToDo(id)}>Delete</Button>
                                      ]}
                                    >
                                      <Skeleton avatar  loading={false} active>
                                        <List.Item.Meta
                                          title={<a href="https://ant.design">{title}</a>}
                                          description={description}
                                        />
                                      </Skeleton>
                                    </List.Item>
                                </div>
                              )
                            }}
                            </Draggable>
                        )}
                      />
                  </div>
                )
              }}
            </Droppable>
          </DragDropContext>
        </Col>
      </Row>
    </div>
  )
}

export default memo(ListComponent);
