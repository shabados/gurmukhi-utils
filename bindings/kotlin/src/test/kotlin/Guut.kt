package gurmukhi_utils.test

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

typealias Fn = (String) -> String

fun guut(testName: String, functions: Map<String, Fn>) {
    val file = File("../../test/$testName.json")
    val type = object : TypeToken<List<Map<String, Any>>>() {}.type
    val units: List<Map<String, Any>> = Gson().fromJson(file.readText(), type)

    for (unit in units) {
        val unitFunctions = (unit["functions"] as List<*>).filterIsInstance<String>()
        val unitType = unit["type"] as String
        val assertions = unit["assertions"]!!

        for (funcName in unitFunctions) {
            val fn = functions[funcName] ?: error("Unknown function: $funcName")

            when (unitType) {
                "is" -> {
                    for ((input, expected) in assertions as Map<*, *>) {
                        assertEquals(expected as String, fn(input as String), "$funcName($input)")
                    }
                }
                "is not" -> {
                    for ((input, expected) in assertions as Map<*, *>) {
                        assertNotEquals(expected as String, fn(input as String), "$funcName($input)")
                    }
                }
                "is-self" -> {
                    val inputs = when (assertions) {
                        is List<*> -> assertions.filterIsInstance<String>()
                        is Map<*, *> -> assertions.keys.filterIsInstance<String>()
                        else -> error("Unexpected assertions type: ${assertions::class}")
                    }
                    for (input in inputs) {
                        assertEquals(input, fn(input), "$funcName($input) should be self")
                    }
                }
            }
        }
    }
}
