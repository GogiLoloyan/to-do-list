import { memo } from "react";
import { Col, Row, List } from 'antd';
import reorder from '../../../utils/reorder';
import { useGlobalContext } from "utils/ContextAPI";
import ToDoItem from "components/molecules/ToDoItem";
import { contextContain, toDoItem } from "interfaces";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ListComponent() {
  const { toDoList, updateOrder }: contextContain = useGlobalContext();

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
            onDragEnd={(result: any) => {
              const { destination, source }: any = result;
              updateOrder(reorder({
                array: toDoList, 
                sourceIndex: source.index, 
                destinationIndex: destination.index
              }))
            }}
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
                        renderItem={({ id, title, description }:toDoItem, index: number): any => (
                          <Draggable
                            index={index}
                            key={`item-${index}`}
                            draggableId={`item-${index}`}
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
                                  <ToDoItem 
                                    id={id} 
                                    title={title} 
                                    description={description}
                                  />
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
