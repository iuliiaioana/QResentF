import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Popconfirm, Tooltip, Card, Col, PageHeader,
  Row, Spin, Empty, Button, Tabs, Modal, Form, Select,
  Divider, Input, Collapse, Switch,
  message, Dropdown, Menu, Typography, Affix
} from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons'

const {Paragraph} = Typography
const {Panel} = Collapse
const {Option} = Select
const AddNewSubjectForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
      <Modal
          title={'Create new Subject'}
          visible={visible}
          onCancel={() =>{
                  onCancel()
          }}
          onOk={() => {
              {form
                  .validateFields()
                  .then(values => {
                      form.resetFields();
                      onCreate(values);
                  })
                  .catch(info => {
                      console.log('Validate Failed:', info);
                  });
          }
      }
      }
      >
         <Form
              form={form}
              name="addCardForm"
              layout="vertical"
          >
              <Form.Item
                  label="Subject name"
                  name="nume"
                  rules={
                      [
                          {
                              required: true,
                             // message: setLocale("ai_trainer.extractor.modal.name.mesasage")
                          }
                      ]
                  }
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Subject Description"
                  name="descriere"
                  rules={
                      [
                          {
                              required: true,
                              //message: setLocale("ai_trainer.extractor.modal.name.mesasage")
                          }
                      ]
                  }
              >
                  <Input />
              </Form.Item>

          </Form>
      </Modal>
  )
}

const AddNewActivityForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
      <Modal
          title={'Create new Activity'}
          visible={visible}
          onCancel={() =>{
                  onCancel()
          }}
          onOk={() => {
              {form
                  .validateFields()
                  .then(values => {
                      form.resetFields();
                      onCreate(values);
                  })
                  .catch(info => {
                      console.log('Validate Failed:', info);
                  });
          }
      }
      }
      >
         <Form
              form={form}
              name="addCardForm"
              layout="vertical"
          >
              <Form.Item
                  label="Interval"
                  name="interval"
                  rules={
                      [
                          {
                              required: true,
                             // message: setLocale("ai_trainer.extractor.modal.name.mesasage")
                          }
                      ]
                  }
              >
                  <Select>{
                  ['8:10','10:12','12:14','14:16','16:18','18:20'].map((item,index)=>{
                      return <Option value={item} key={index}>{item}</Option>
                  })
                    }
                  </Select>
              </Form.Item>

              <Form.Item
                  label="Zi"
                  name="zi"
                  rules={
                      [
                          {
                              required: true,
                              //message: setLocale("ai_trainer.extractor.modal.name.mesasage")
                          }
                      ]
                  }
              >
                  <Select>{
                  ['luni','marti','miercuri','joi','vineri'].map((item,index)=>{
                      return <Option value={item} key={index}>{item}</Option>
                  })
                    }
                  </Select>
              </Form.Item>
              <Form.Item
                  label="Grupa"
                  name="grupa"
                  rules={
                      [
                          {
                              required: true,
                              // message: setLocale("ai_trainer.extractor.modal.name.mesasage")
                          }
                      ]
                  }
              >
                  <Input />
              </Form.Item>

          </Form>
      </Modal>
  )
}

export default function Subjects() {

  const [subjects, setSubjects] = useState([])
  const [modalVisibleAddNew, setModalVisibleAddNew] = useState(false)
  const [modalVisibleAddNewActivity, setModalVisibleAddNewActivity] = useState(false)
  const [activeSubjectID, setActiveSubjectID] = useState(-1)


  const getSubjectsFromServer = async () =>{
    
    const res = await fetch('http://localhost:5000/materii', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    return res
  }

  const getSubjects = () =>{

    getSubjectsFromServer().then(res =>{
       res.json().then(res =>{
        setSubjects(res)
       })
    })
  }

  const showModalAddNew = () => {
    setModalVisibleAddNew(true)
};


  const closeModalAddNew = () => {
    setModalVisibleAddNew(false)
}

const showModalAddNewActivity = () => {
  setModalVisibleAddNewActivity(true)
};


const closeModalAddNewActivity = () => {
    setActiveSubjectID(-1)
  setModalVisibleAddNewActivity(false)
}

const addSubjectToServer = async (values) => {
  const res = await fetch('http://localhost:5000/materii', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
  }
  );
  return res
}

const addSubject = (values) => {
  setModalVisibleAddNew(false)
  addSubjectToServer(values).then(res => {

      if (res.status === 200) {
         getSubjects()
      } else if (res.status === 400) {
          
      } else if (res.status === 500 || res.status === 501 || res.status === 502
          || res.status === 503 || res.status === 504 || res.status === 505 || res.status === 506
          || res.status === 507 || res.status === 508 || res.status === 509) {
      }
      else {
      }

  })
}

const addActivityToServer = async (values) => {
  const res = await fetch('http://localhost:5000/activitati', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({...values,id_materie:activeSubjectID})
  }
  );
  return res
}

const addActivity = (values) => {
  setModalVisibleAddNewActivity(false)
  addActivityToServer(values).then(res => {

      if (res.status === 200) {
         getSubjects()
      } else if (res.status === 400) {
          
      } else if (res.status === 500 || res.status === 501 || res.status === 502
          || res.status === 503 || res.status === 504 || res.status === 505 || res.status === 506
          || res.status === 507 || res.status === 508 || res.status === 509) {
      }
      else {
      }

  })
}

  useEffect(()=>{
    getSubjects()
  },[])

  return (
    <>
        <Row style={{marginLeft:'5%'}} gutter="16">
            <PageHeader
              style={{marginLeft:'40px'}}
              title={<>Subjects</>}/>
              <Divider type='horizontal'/>
              <div style={{width:'90%'}}>
              <Row gutter={3} justify="space-between">
                {
                subjects.map(item =>{
                  let id_materie = item.id
                  return <Col span={8} >
                  <Card 
                  title={item.nume}>
                    <ul>
                        <li><Paragraph >{item.descriere}</Paragraph></li>
                    </ul>
                    <Collapse ghost>
                      <Panel header="Activities" key='Activities'>{
                        <Row gutter={3}>
                        {
                        item.activitati.map(act =>{
                          return <Col span={12}>
                          <Card>
                          <ul>
                            <li><Paragraph >{act.grupa}</Paragraph></li>
                            <li><Paragraph >{act.zi}</Paragraph></li>
                            <li><Paragraph >{act.interval}</Paragraph></li>
                          </ul>
                          </Card>
                          </Col>
                        })
                      }
                        </Row>
                        
                      }
                      </Panel>
                      </Collapse>
                      <div style={{marginLeft:'60%', marginTop:'10%'}}>
                          <Button 
                          type="primary"
                              onClick={() => {
                                setActiveSubjectID(id_materie)
                                showModalAddNewActivity()
                              }}>
                              {'Add new activity'}</Button>
                      </div>
                  </Card>
                  </Col>
                })
              }
              </Row>

              </div>
        </Row>
        <div style={{marginLeft:'90%', marginTop:'10%'}}>
                <Button 
                type="primary"
                    onClick={() => {
                      showModalAddNew()
                    }}>
                    {'Add new subject'}</Button>
            </div>
            <AddNewSubjectForm visible={modalVisibleAddNew} onCreate={addSubject} onCancel={closeModalAddNew} />
            <AddNewActivityForm visible={modalVisibleAddNewActivity} onCreate={addActivity} onCancel={closeModalAddNewActivity} />
    </>
  );
}