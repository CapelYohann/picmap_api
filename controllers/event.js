const ModelIndex = require('../models');
const Event = ModelIndex.Event;
const Photo = ModelIndex.Photo;
const Op = ModelIndex.Sequelize.Op;
const Now = ModelIndex.Sequelize.NOW;

const EventController = function() { };

EventController.count = function() {
  return Event.count();
}

EventController.findAll = function(id, name, start_date, end_date, coordinate_x, coordinate_y, range, photos) {
  const where = {};
  const options = {};

    if(id !== undefined){
        where.id = id;
    }
    if(name !== undefined){
        where.name = name;
    }
    if(start_date !== undefined){
        where.start_date = start_date;
    }
    if(end_date !== undefined){
        where.end_date = end_date;
    }
    if(coordinate_x !== undefined){
        where.coordinate_x = coordinate_x;
    }
    if(coordinate_y !== undefined){
        where.coordinate_y = coordinate_y;
    }
    if(range !== undefined){
        where.range = range;
    }

    options.where = where;
    if(photos) {
      options.include = [{
        model: Photo,
        include: ['User'],
        where: { deleted: 0 },
        required: false
      }]
    }
    return Event.findAll(options);
};

EventController.findActuals = function(id, name, start_date, end_date, coordinate_x, coordinate_y, range, photos) {
  const where = {};
  const options = {};

  if(id !== undefined){
      where.id = id;
  }
  if(name !== undefined){
      where.name = name;
  }
  if(coordinate_x !== undefined){
      where.coordinate_x = coordinate_x;
  }
  if(coordinate_y !== undefined){
      where.coordinate_y = coordinate_y;
  }
  if(range !== undefined){
      where.range = range;
  }

  where.start_date = {
      [Op.lte]: new Date()
  };
  where.end_date = {
      [Op.gte]: new Date()
  };

  options.where = where;
  if(photos) {
      options.include = [{
          model: Photo,
          include: ['User'],
          where: { deleted: 0 },
          required: false
      }]
  }

  return Event.findAll(options);
};

EventController.findOlds = function(id, name, start_date, end_date, coordinate_x, coordinate_y, range, photos) {
  const where = {};
  const options = {};

  if(id !== undefined){
      where.id = id;
  }
  if(name !== undefined){
      where.name = name;
  }
  if(coordinate_x !== undefined){
      where.coordinate_x = coordinate_x;
  }
  if(coordinate_y !== undefined){
      where.coordinate_y = coordinate_y;
  }
  if(range !== undefined){
      where.range = range;
  }

  where.end_date = {
      [Op.lte]: new Date()
  };

  options.where = where;
  if(photos) {
      options.include = [{
          model: Photo,
          include: ['User'],
          where: { deleted: 0 },
          required: false
      }]
  }

  return Event.findAll(options);
};

EventController.findOne = function(id, name, start_date, end_date, coordinate_x, coordinate_y, range, photos) {
    const where = {};
    const options = {};

    if(id !== undefined){
        where.id = id;
    }
    if(name !== undefined){
        where.name = name;
    }
    if(start_date !== undefined){
        where.start_date = start_date;
    }
    if(end_date !== undefined){
        where.end_date = end_date;
    }
    if(coordinate_x !== undefined){
        where.coordinate_x = coordinate_x;
    }
    if(coordinate_y !== undefined){
        where.coordinate_y = coordinate_y;
    }
    if(range !== undefined){
        where.range = range;
    }

    options.where = where;
    options.where = where;
    if(photos) {
        options.include = [{
            model: Photo,
            include: ['User'],
            where: { deleted: 0 },
            required: false
        }]
    }
    
    return Event.findOne(options);
};

EventController.createEvent = function(name, start_date, end_date, coordinate_x, coordinate_y, range) {
    return Event.create({
        name: name,
        start_date: start_date,
        end_date: end_date,
        coordinate_x: coordinate_x,
        coordinate_y: coordinate_y,
        range: range
    });
}

EventController.update = function(id, name, start_date, end_date, coordinate_x, coordinate_y, range) {
    return Event.update({
        name: name,
        start_date: start_date,
        end_date: end_date,
        coordinate_x: coordinate_x,
        coordinate_y: coordinate_y,
        range: range
    }, {
        where: { id: id }
    });
}

EventController.remove = function(id) {
    return Event.destroy({
        where: {
            id: id
        }
    });
}

module.exports = EventController;
