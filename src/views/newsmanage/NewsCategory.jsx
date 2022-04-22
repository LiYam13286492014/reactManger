import { Table ,Button,Form,Input  } from 'antd'
import axios from 'axios';
import React from 'react'
import { useEffect,useState} from 'react';
import { useRef,useContext } from 'react';



const EditableContext = React.createContext(null);

export default function NewsCategory() {
    const[dataSource,setDataSource]=useState([])


    useEffect(()=>{
        axios.get(`http://localhost:3001/categories`)
        .then(res=>{
            setDataSource(res.data)
        })
    },[])

    const handleSave =(record)=>{
        axios.patch(`http://localhost:3001/categories/${record.id}`,{
            title:record.title,
            value:record.title
        }).then(()=>{
            setDataSource(dataSource.map(item=>{
                if(item.id===record.id){
                    return {
                        id:record.id,
                        value:record.title,
                        title:record.title
                    }
                }else{
                    return item
                }
            }))
        })
    }

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',

        

        },
        {
          title: '标题栏目',
          dataIndex: 'title',
          onCell: (record) => ({
            record,
            editable: true,
            dataIndex:'title',
            title: '标题栏目',
            handleSave: handleSave
          }),

          
        },




        {
            title:'操作',
            render:(item)=>{

                return <div >
                    <Button danger >Delete</Button>
                                                                                   
                    
                </div>
            }
        }
      ];

      const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
          <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
              <tr {...props} />
            </EditableContext.Provider>
          </Form>
        );
      };
      
      const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
      }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
          if (editing) {
            inputRef.current.focus();
          }
        }, [editing]);
      
        const toggleEdit = () => {
          setEditing(!editing);
          form.setFieldsValue({
            [dataIndex]: record[dataIndex],
          });
        };
      
        const save = async () => {
          try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
          } catch (errInfo) {
            console.log('Save failed:', errInfo);
          }
        };
      
        let childNode = children;
      
        if (editable) {
          childNode = editing ? (
            <Form.Item
              style={{
                margin: 0,
              }}
              name={dataIndex}
              rules={[
                {
                  required: true,
                  message: `${title} is required.`,
                },
              ]}
            >
              <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
          ) : (
            <div
              className="editable-cell-value-wrap"
              style={{
                paddingRight: 24,
              }}
              onClick={toggleEdit}
            >
              {children}
            </div>
          );
        }
      
        return <td {...restProps}>{childNode}</td>;
      };

      const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };
      
  return (
    <div> 
        <Table dataSource={dataSource} columns={columns} 
                pagination={{pageSize:5}}
                rowKey={(item)=>item.id}
                components={components}
        />
    </div>
  )
}
