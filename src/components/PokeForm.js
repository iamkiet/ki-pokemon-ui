import React, { useContext, useState } from "react";
import { Form, Input, Button, Card, Select } from "antd";
import env from "../env";
import { PokemonContext } from "../contexts/PokemonContextProvider";
import axios from "axios";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 19, span: 16 },
};

function PokeForm(props) {
  const { state, dispatch } = useContext(PokemonContext);

  const [form] = Form.useForm();

  const onPokeImageChanged = (e) => {
    dispatch({
      type: env.ACTION_UPDATE_FORM_IMAGE,
      value: e,
    });
  };

  const cardStyle = {
    width: 500,
    backgroundColor: "transparent",
    borderRadius: "5px",
    border: "1px solid white",
  };

  const inputStyle = {
    width: 70,
  };

  const onFinish = (values) => {
    const { name, description, image_path } = values;
    const payload = {
      name,
      description,
      image_path,
      vote_counting: 0,
    };

    axios
      .post(env.API_CANDIDATES, payload)
      .then((res) => {
        let { status } = res;
        if (status === 201) {
          axios.get(env.API_CANDIDATES).then((res) => {
            dispatch({ type: env.ACTION_UPDATE_CANDIDATES, value: res.data });
          });
          form.resetFields();
        }
      })
      .catch((error) => {
        alert(error + "huhu");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card title="NEW POKEMON" bordered={false} style={cardStyle}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            labelAlign="left"
            label="NAME"
            name="name"
            rules={[{ required: true, message: "Please input your NAME!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelAlign="left"
            label="DESCRIPTION"
            name="description"
            rules={[
              { required: true, message: "Please input your DESCRIPTION!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            name="image_path"
            label="IMAGE"
            defaultValue="/pokemons/poke-01.png"
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onPokeImageChanged}
              allowClear
              defaultValue="/pokemons/poke-01.png"
            >
              <Option value="/pokemons/poke-01.png">Poke 01</Option>
              <Option value="/pokemons/poke-02.png">Poke 02</Option>
              <Option value="/pokemons/poke-03.png">Poke 03</Option>
              <Option value="/pokemons/poke-04.png">Poke 04</Option>
              <Option value="/pokemons/poke-05.png">Poke 05</Option>
              <Option value="/pokemons/poke-06.png">Poke 06</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              GOOOOO
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PokeForm;
