package com.woody.nanjang

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.UUID

@Entity(tableName = "clothing")
data class Clothing(
    @PrimaryKey val id: String = UUID.randomUUID().toString(),
    val imageUri: String,
    val category: String,
    val createdAt: Long = System.currentTimeMillis()
)