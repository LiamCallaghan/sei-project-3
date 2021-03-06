const Quest = require('../models/quest')
const { notFound } = require('../lib/errorMessages')

async function questCreate(req, res, next) {
  try {
    const newQuestData = { ...req.body, owner: req.currentUser._id }
    const newQuest = await Quest.create(newQuestData)
    res.status(201).json(newQuest)
  } catch (err) {
    next(err)
  }
}

async function questIndex(_req, res, next){
  try {
    const quests = await Quest.find()
      .populate('owner')
    if (!quests) throw new Error(notFound)
    res.status(200).json(quests)
  } catch (err) {
    next(err)
  }
}

async function stopCreate(req, res, next){
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    const stop = { ...req.body }
    quest.stops.push(stop)
    await quest.save()
    res.status(201).json(quest)
  } catch (err) {
    next(err)
  }
}

async function questShow(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id).populate('owner').populate('reviews.owner')
    if (!quest) throw new Error(notFound)
    res.status(200).json(quest)
  } catch (err) {
    next(err)
  }
}

async function questUpdate(req, res, next) {
  try {
    const questToEdit = await Quest.findById(req.params.id)
    if (!questToEdit) throw new Error(notFound)
    const updates = { ...req.body }
    let estTime = questToEdit.estTime
    const completedTimes = questToEdit.completedTimes
    if (Object.keys(updates).includes('completedTime')) {
      completedTimes.push(updates.completedTime)
      estTime = (completedTimes.reduce((acc, curr) => {
        return acc + curr
      }, 0) / Math.max(1, completedTimes.length))
      updates.completedTimes = completedTimes
      updates.estTime = estTime
    }
    Object.assign(questToEdit, updates)
    await questToEdit.save()
    res.status(202).json(questToEdit)
  } catch (err) {
    next(err)
  }
}

async function questDelete(req, res, next) {
  try {
    const questToDelete = await Quest.findById(req.params.id)
    if (!questToDelete) throw new Error(notFound)
    await questToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function stopShow(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    const stop = await quest.stops.id(req.params.stopId)
    if (!stop) throw new Error(notFound)
    res.status(200).json(stop)
  } catch (err) {
    next(err)
  }
}

async function stopUpdate(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    const stopToEdit = await quest.stops.id(req.params.stopId)
    if (!stopToEdit) throw new Error(notFound)
    Object.assign(stopToEdit, req.body)
    await stopToEdit.save()
    res.status(202).json(stopToEdit)
  } catch (err) {
    next(err)
  }
}

async function stopDelete(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    const stopToDelete = await quest.stops.id(req.params.stopId)
    if (!stopToDelete) throw new Error(notFound)
    await stopToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function reviewCreate(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    quest.reviews.push({ ...req.body, owner: req.currentUser._id })
    await quest.save()
    res.status(201).json(quest)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: questIndex,
  create: questCreate,
  show: questShow,
  questUpdate,
  questDelete,
  stopCreate,
  stopShow,
  stopUpdate,
  stopDelete,
  reviewCreate
}