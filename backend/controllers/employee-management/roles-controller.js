import { Vacancy } from '../../models/employee-management/roles-model.js';

async function index(req, res) {
  try {
    // Get all Vacancies
    console.log("Vacancy");
    const vacancies = await Vacancy.find({});
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function show(req, res) {
  try {
    // Find Vacancy by ID
    const vacancy = await Vacancy.findById(req.params.id);
    res.json(vacancy);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
  console.log(req.body);
  try {
    const newVacancy = new Vacancy(req.body);
    await newVacancy.save();
    res.status(201).json(newVacancy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    // Update Vacancy by ID
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedVacancy) {
      return res.status(404).json({ error: 'Vacancy not found' });
    }

    res.json(updatedVacancy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    // Find and delete Vacancy by ID
    const deletedVacancy = await Vacancy.findByIdAndDelete(req.params.id);
    if (!deletedVacancy) {
      return res.status(404).json({ error: 'Vacancy not found' });
    }
    res.json({ message: 'Vacancy deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export { index, show, create, update, destroy };
