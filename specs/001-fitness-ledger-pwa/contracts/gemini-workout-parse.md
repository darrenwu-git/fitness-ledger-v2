# Contract: Gemini Workout Parsing

## Interface: Voice-to-Structured-Workout

### Request: System Prompt (Context)
- **Role**: Expert Fitness Data Analyst
- **Task**: Extract structured workout details from natural language descriptions.
- **Rules**:
  - Always return valid JSON.
  - Support multiple exercises in one sentence.
  - For strength, include 'exerciseName', 'sets', 'reps', 'weight'.
  - For cardio, include 'exerciseName', 'duration' (minutes).
  - Default 'unit' to 'kg' if not specified.

### Output: JSON Schema (Response)
```json
{
  "workouts": [
    {
      "exerciseName": "Bench Press",
      "type": "strength",
      "sets": [
        { "reps": 10, "weight": 60 },
        { "reps": 10, "weight": 60 }
      ],
      "unit": "kg"
    },
    {
      "exerciseName": "Running",
      "type": "cardio",
      "duration": 30,
      "unit": "min"
    }
  ]
}
```

### Examples (Prompt / Output Pairs)

**Example 1**
- **Input**: "I did three sets of ten squats at eighty kilograms."
- **Output**:
  ```json
  {
    "workouts": [
      {
        "exerciseName": "Squats",
        "type": "strength",
        "sets": [
          { "reps": 10, "weight": 80 },
          { "reps": 10, "weight": 80 },
          { "reps": 10, "weight": 80 }
        ],
        "unit": "kg"
      }
    ]
  }
  ```

**Example 2**
- **Input**: "Ran for 20 minutes then did some bicep curls, 3 sets of 12 with 15kg dumbbells."
- **Output**:
  ```json
  {
    "workouts": [
      {
        "exerciseName": "Running",
        "type": "cardio",
        "duration": 20,
        "unit": "min"
      },
      {
        "exerciseName": "Bicep Curls",
        "type": "strength",
        "sets": [
          { "reps": 12, "weight": 15 },
          { "reps": 12, "weight": 15 },
          { "reps": 12, "weight": 15 }
        ],
        "unit": "kg"
      }
    ]
  }
  ```
