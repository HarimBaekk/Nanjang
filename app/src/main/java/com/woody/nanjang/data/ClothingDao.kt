package com.woody.nanjang

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface ClothingDao {
    @Query("SELECT * FROM clothing")
    fun getAll(): Flow<List<Clothing>>

    @Insert
    suspend fun insert(clothing: Clothing)

    @Delete
    suspend fun delete(clothing: Clothing)
}