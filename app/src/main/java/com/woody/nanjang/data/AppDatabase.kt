package com.woody.nanjang

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [Clothing::class],
    version = 1
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun clothingDao(): ClothingDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                Room.databaseBuilder(
                    context,
                    AppDatabase::class.java,
                    "fashion_database"
                ).build().also { INSTANCE = it }
            }
        }
    }
}