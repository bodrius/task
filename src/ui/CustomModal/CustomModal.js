import React from 'react';
import {View, Modal, TouchableOpacity, Text} from 'react-native';

import {styles} from './stylesCustomModal';

const CustomModal = ({children, showModal, onShow, closeModal}) => {
  return (
    <Modal
      visible={showModal}
      animationType="slide"
      onShow={onShow}
      onRequestClose={closeModal}>
      <View style={styles.mainContainer}>{children}</View>
      <TouchableOpacity onPress={closeModal} style={styles.btnBack}>
        <Text style={styles.textGoBackBtn}>GO BACK</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;
