import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  const CustomTextField({Key? key,
    required this.controller,
    required this.hintText,}):super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      //validator: ,
       controller: controller,
      decoration: InputDecoration(
        hintText: hintText ,
        border: const OutlineInputBorder(
          borderSide: BorderSide(
            color: Colors.black38,
          )
        ),
        enabledBorder:  const OutlineInputBorder(
      borderSide: BorderSide(
      color: Colors.black38,
      )
    ),
      ) ,
      validator: (val){
         if(val==null || val.isEmpty){
           return 'Enter your $hintText';
         }
         return null;
      },
    );
  }
}
