package com.woody.nanjang

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue

@Composable
fun ClosetScreen() {
    var clothingList by remember { mutableStateOf(listOf<Clothing>()) }

    Column {
        // 카메라 버튼
        Button(onClick = { /* 카메라 촬영 */ }) {
            Text("옷 추가 📷")
        }

        // 옷 목록 (간단 그리드)
        LazyVerticalGrid(
            columns = GridCells.Fixed(2)
        ) {
            items(clothingList) { clothing ->
                ClothingCard(clothing)
            }
        }
    }
}