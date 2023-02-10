import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  FlatList,
  Pressable, Image
} from "react-native";
import { useState } from 'react';
import ProductText from "./src/screens/ProductText";

export default function App(props) {
  const route = props.route;
  const nameChuyenMH = route.params.name;
  // const data = [
  //   {
  //     id: 1,
  //     name: 'Nguyễn Đức Trọng',
  //     age: 11,
  //   }];
  // {
  //   id: 2,
  //   name: 'Iphone 12',
  //   age: 12000000,
  // },

  const data = [
    {
      id: 1,
      name: "Nguyễn Đức Trọng",
      age: 20,
    }
  ];
  // De danh sach render lai khi co du lieu moi thi can 1 ds dang state
  const [productList, setProductList] = useState(data);
  const [isShowAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [ageValue, setageValue] = useState(0);

  const handleClose = () => {
    setNameValue(''); setageValue(0); setEditId(0);
    setShowAdd(false);
  }

  const handleAdd = () => {
    // Nếu có editId thì là đang sửa và cần cập nhật pt
    if (editId) {
      const newEditProductList = [...productList];
      for (let i = 0; i < newEditProductList.length; i++) {
        if (newEditProductList[i].id == editId) {
          newEditProductList[i].name = nameValue;
          newEditProductList[i].age = ageValue;
        }
      }
      setProductList(newEditProductList);
      return handleClose();
    }

    // Khi bam Luu se goi ham nay
    // 1. Dinh nghia object moi se duoc them vao mang du lieu
    const newItem = {
      id: productList.length == 0
        ? 1
        : productList[productList.length - 1].id + 1,
      name: nameValue,
      age: ageValue
    };
    // 2. Them phan tu moi vao mang sau do cap nhat lai ds
    // ... se lay ra toan bo phan tu cua mang, sau do ghep cung phan tu moi
    const newProductList = [...productList, newItem];
    // 3. Cap nhat ds moi de hien thi
    setProductList(newProductList);
    // 4. Cap nhat input ve ds mac dinh va dong modal
    return handleClose();
  };

  const handleDelete = (deleteId) => {
    const newProductList = productList
      .filter(item => item.id !== deleteId);
    setProductList(newProductList);
  };

  // Hàm Sửa Chạy khi bấm nút sửa ở từng phần tử
  const handleEdit = (editId) => {
    // 1. Hiển thị modal lên
    setShowAdd(true);
    // 2. Truyền giá trị cần sửa vào TextInput
    const editItem = productList
      .find(item => item.id == editId);
    setNameValue(editItem.name);
    setageValue(editItem.age);
    setEditId(editItem.id);
  };

  return (
    <View style={styles.container}>

      {/* visible cua Modal se the hien trang thai an hien */}
      {/* Thay the cho cach dung toan tu 3 ngoi de an hien giao dien */}
      <Modal visible={isShowAdd} animationType="slide">
        <View>
          <Text>{nameValue}</Text>
          <TextInput placeholder="Tên"
            value={nameValue}
            onChangeText={(text) => setNameValue(text)}
          />
          <TextInput placeholder="Tuổi" keyboardType="numeric"
            value={ageValue}
            onChangeText={(text) => setageValue(text)}
          />
          <Button title="Huy" onPress={() => handleClose()} />
          <Button title="Luu" onPress={() => handleAdd()} />
        </View>
      </Modal>
      <FlatList
        data={productList}
        renderItem={({ item }) => <View>
          {/* <Text>{item.id}</Text> */}
          {/* <Image
        style={styles.image}
        source={{uri:'https://www.techone.vn/wp-/uploads/2020/10/xanh-navy-500x500.jpg'}}        />
         
          */}
         <Image
        style={styles.image}
        source={{uri:'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/162676803_287627316210357_7291282574471486723_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=eDL7BbdShbgAX8V-xHu&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDdU8cdjU234LMc90-81nzdrTmO6OXSdCS9LuD8ok8Liw&oe=640C57B3'}}        />
   
          {/* <ProductText /> */}
          <Text style={styles.text}>Tên : {item.name}</Text>
          <Text style={styles.text}>Tuổi: {item.age} </Text>

          <Button title="EDIT" onPress={() => handleEdit(item.id)} />

          {/* <Pressable onPress={() => handleDelete(item.id)}>
            <Text>Xoa</Text>
          </Pressable> */}
        </View>}
        keyExtractor={(item) => item.id}
      />
      {/* <Text>ND lấy từ Home: {nameChuyenMH}</Text> */}
      {/* {isShowAdd
        ? null
        : <Button title="Edit" onPress={() => setShowAdd(true)} />
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    // tên của phần thay đổi giao diện
    color: "red",
    fontStyle: "nomal",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  image:{
    width:200,
    height:200,
    borderRadius:100,
    alignItems: "center",
    justifyContent: "center",
  }
});
