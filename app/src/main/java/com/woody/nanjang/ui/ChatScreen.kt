package com.woody.nanjang

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ChatScreen() {
    var messages by remember { mutableStateOf(listOf<String>()) }
    var inputText by remember { mutableStateOf("") }

    Column {
        // 메시지 목록
        LazyColumn(modifier = Modifier.weight(1f)) {
            items(messages) { message ->
                Text(
                    text = message,
                    modifier = Modifier.padding(8.dp)
                )
            }
        }

        // 입력창
        Row {
            TextField(
                value = inputText,
                onValueChange = { inputText = it },
                modifier = Modifier.weight(1f)
            )
            Button(onClick = {
                // 간단한 룰 기반 응답
                val response = getSimpleResponse(inputText)
                messages = messages + inputText + response
                inputText = ""
            }) {
                Text("전송")
            }
        }
    }
}

fun getSimpleResponse(input: String): String {
    return when {
        "추천" in input -> "오늘은 흰 셔츠 + 청바지 어떠세요?"
        "색깔" in input -> "파란색과 흰색 조합이 좋아요!"
        else -> "더 구체적으로 말씀해주세요!"
    }
}