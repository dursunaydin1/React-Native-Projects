import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR} from '../../../utils/Colors';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomDropDown from '../../../components/CustomDropDown';
import CustomSolidBtn from '../../../components/CustomSolidBtn';
import {useNavigation} from '@react-navigation/native';
import {profiles} from '../../../utils/Profiles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [badJobTitle, setBadJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [badJobDesc, setBadJobDecs] = useState('');
  const [exp, setExp] = useState('');
  const [badExp, setBadExp] = useState('');
  const [salary, setSalary] = useState('');
  const [badSalary, setBadSalary] = useState('');
  const [company, setCompany] = useState('');
  const [badCompany, setBadCompany] = useState('');
  const [openCategoryModal, setCategoryModal] = useState(false);
  const [openSkillModal, setSkillModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Kategori seç');
  const [badJobCategory, setBadJobCategory] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('Yetenek seç');
  const [badJobSkill, setBadJobSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const postJob = async () => {
    let id = await AsyncStorage.getItem('USER_ID');
    let name = await AsyncStorage.getItem('NAME');
    setLoading(true);
    firestore()
      .collection('jobs')
      .add({
        postedBy: id,
        posterName: name,
        jobTitle: jobTitle,
        jobDesc,
        exp,
        salary,
        company,
        skill: selectedSkill,
        category: profiles[selectedCategory].category,
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const validate = () => {
    let validJobTitle = true;
    let validJobDesc = true;
    let validCategory = true;
    let validSkill = true;
    let validExp = true;
    let validPackage = true;
    let validCompany = true;

    if (jobTitle == '') {
      validJobTitle = false;
      setBadJobTitle('Lütfen iş başlığını girin!');
    } else if (jobTitle != '') {
      validJobTitle = true;
      setBadJobTitle('');
    }

    if (jobDesc == '') {
      validJobDesc = false;
      setBadJobDecs('Lütfen iş açıklamasını girin!');
    } else if (jobDesc != '' && jobDesc.length < 10) {
      validJobDesc = false;
      setBadJobDecs('Lütfen açıklama çin min 10 karakter girin!');
    } else if (jobDesc != '' && jobDesc.length >= 10) {
      validJobDesc = true;
      setBadJobDecs('');
    }

    if (selectedCategory == 'Kategori seç') {
      validCategory = false;
      setBadJobCategory('Lütfen Kategori seçiniz!');
    } else if (selectedCategory != 'Kategori seç') {
      validCategory = true;
      setBadJobCategory('');
    }

    if (selectedSkill == 'Yetenek seç') {
      validSkill = false;
      setBadJobSkill('Lütfen Yetenek seçiniz!');
    } else if (selectedSkill != 'Yetenek seç') {
      validSkill = true;
      setBadJobSkill('');
    }
    if (exp === '') {
      validExp = false;
      setBadExp('Lütfen deneyiminizi giriniz!');
    } else if (isNaN(exp) || exp.length < 1) {
      validExp = false;
      setBadExp('Lütfen geçerli bir deneyim giriniz!');
    } else if (exp.length > 2) {
      validExp = true;
      setBadExp('');
    }

    if (salary == '') {
      validPackage = false;
      setBadSalary('Lütfen maaş giriniz!');
    } else if (isNaN(salary)) {
      validPackage = false;
      setBadSalary('Lütfen geçerli bir maaş giriniz!');
    } else {
      validPackage = true;
      setBadSalary('');
    }

    if (company == '') {
      validCompany = false;
      setBadCompany('Lütfen şirket giriniz!');
    } else {
      validCompany = true;
      setBadCompany('');
    }

    return (
      validJobTitle &&
      validJobDesc &&
      validCategory &&
      validSkill &&
      validExp &&
      validPackage &&
      validCompany
    );
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../../images/close.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.title}>İş İlanı Ver</Text>
      </View>
      <CustomTextInput
        value={jobTitle}
        onChangeText={txt => setJobTitle(txt)}
        title={'İş Pozisyonu'}
        placeholder={'ör. web development'}
        bad={badJobTitle != '' ? true : false}
      />
      {badJobTitle != '' && (
        <Text style={styles.errMessage}>{badJobTitle}</Text>
      )}
      <CustomTextInput
        value={jobDesc}
        onChangeText={txt => setJobDesc(txt)}
        title={'İş Açıklaması'}
        placeholder={'ör. bu bir w &&eb geliştirme işi'}
        bad={badJobDesc != '' ? true : false}
      />
      {badJobDesc != '' && <Text style={styles.errMessage}>{badJobDesc}</Text>}
      <CustomDropDown
        value={jobDesc}
        onChangeText={txt => setJobDesc(txt)}
        title={'Kategori'}
        bad={badJobCategory != '' ? true : false}
        placeholder={
          selectedCategory == 'Kategori seç'
            ? 'Kategori seç'
            : profiles[selectedCategory].category
        }
        onClick={() => {
          setCategoryModal(true);
        }}
      />
      {badJobCategory != '' && (
        <Text style={styles.errMessage}>{badJobCategory}</Text>
      )}
      <CustomDropDown
        value={jobDesc}
        onChangeText={txt => setJobDesc(txt)}
        title={'Yetenek'}
        bad={badJobSkill != '' ? true : false}
        placeholder={selectedSkill}
        onClick={() => {
          setSkillModal(true);
        }}
      />
      {badJobSkill != '' && (
        <Text style={styles.errMessage}>{badJobSkill}</Text>
      )}
      <CustomTextInput
        keyboardType={'number-pad'}
        value={exp}
        onChangeText={txt => setExp(txt)}
        title={'Deneyim'}
        placeholder={'ör. 5 yıllık deneyim'}
        bad={badExp != '' ? true : false}
      />
      {badExp != '' && <Text style={styles.errMessage}>{badExp}</Text>}
      <CustomTextInput
        keyboardType={'number-pad'}
        value={salary}
        onChangeText={txt => setSalary(txt)}
        title={'Ücret'}
        placeholder={'ör. 10L'}
        bad={badSalary != '' ? true : false}
      />
      {badSalary != '' && <Text style={styles.errMessage}>{badSalary}</Text>}

      <CustomTextInput
        value={company}
        onChangeText={txt => setCompany(txt)}
        title={'Şirket'}
        placeholder={'ör. google'}
        bad={badCompany != '' ? true : false}
      />
      {badCompany != '' && <Text style={styles.errMessage}>{badCompany}</Text>}

      <CustomSolidBtn
        title={'İlan Ver'}
        onClick={() => {
          if (validate()) {
            postJob();
          }
        }}
      />

      <Modal visible={openCategoryModal} transparent style={{flex: 1}}>
        <View style={styles.modalMainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, {marginTop: moderateScale(20)}]}>
              Kategori Seç
            </Text>
            <FlatList
              data={profiles}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      setSelectedCategory(index);
                      setCategoryModal(false);
                    }}>
                    <Text>{item.category}</Text>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{paddingBottom: verticalScale(20)}}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={openSkillModal} transparent style={{flex: 1}}>
        <View style={styles.modalMainView}>
          <View style={styles.listingView}>
            <Text style={[styles.title, {marginTop: moderateScale(20)}]}>
              Yetenek Seç
            </Text>
            <FlatList
              data={
                selectedCategory == 'Kategori seç'
                  ? profiles[0].keywords
                  : profiles[selectedCategory].keywords
              }
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      setSelectedSkill(item[0]);
                      setSkillModal(false);
                    }}>
                    <Text>{item[0]}</Text>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{paddingBottom: verticalScale(20)}}
            />
          </View>
        </View>
      </Modal>
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default AddJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  header: {
    width: '100%',
    height: verticalScale(45),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
  },
  back: {
    width: scale(16),
    height: scale(16),
  },
  title: {
    fontSize: moderateScale(20),
    marginLeft: moderateScale(20),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  modalMainView: {
    backgroundColor: 'rgba(0,0,0,.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingView: {
    width: '90%',
    height: '80%',
    borderRadius: moderateScale(10),
    backgroundColor: BG_COLOR,
  },
  profileItem: {
    width: '90%',
    height: verticalScale(40),
    justifyContent: 'center',
    paddingLeft: moderateScale(20),
    alignSelf: 'center',
    borderBottomWidth: 0.4,
  },
  errMessage: {
    color: 'red',
    marginLeft: moderateScale(25),
  },
});
