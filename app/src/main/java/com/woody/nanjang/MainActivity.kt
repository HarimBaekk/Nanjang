package com.woody.nanjang

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.woody.nanjang.ui.theme.NanjangTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            NanjangTheme {
                HomeScreen()
            }
        }
    }
}

@Composable
fun HomeScreen(){
    var selectedTab by remember { mutableStateOf(0) }

    Column (modifier = Modifier.fillMaxSize()){
        // 간단한 탭 버튼들
        Row {
            TabButton("옷장", 0, selectedTab) { selectedTab = 0 }
            TabButton("착용", 1, selectedTab) { selectedTab = 1 }
            TabButton("채팅", 2, selectedTab) { selectedTab = 2 }
        }

        // 탭 내용
        when (selectedTab) {
            0 -> ClosetScreen()
            1 -> TryOnScreen()
            2 -> ChatScreen()
            else -> {}
        }
    }

}

@Composable
fun TabButton(x0: String, x1: Int, x2: Int, content: @Composable () -> Unit) {
    TODO("Not yet implemented")
}

@Preview(showBackground = true)
@Composable
fun PreviewMAinScreen(){
    NanjangTheme {
        HomeScreen()
    }

}