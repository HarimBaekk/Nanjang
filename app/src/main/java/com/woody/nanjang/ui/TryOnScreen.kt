package com.woody.nanjang

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue

@Composable
fun TryOnScreen() {
    var selectedClothing by remember { mutableStateOf<Clothing?>(null) }
    var userPhoto by remember { mutableStateOf<String?>(null) }

    Column {
        // 셀피 촬영
        Button(onClick = { /* 셀피 촬영 */ }) {
            Text("셀카 찍기 🤳")
        }

        // 옷 선택
        Button(onClick = { /* 옷 선택 */ }) {
            Text("옷 선택 👕")
        }

        // 간단한 결과 표시
        if (userPhoto != null && selectedClothing != null) {
            Text("가상 착용 결과!")
        }
    }
}