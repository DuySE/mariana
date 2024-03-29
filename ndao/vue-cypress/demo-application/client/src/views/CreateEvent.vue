<template>
  <div>
    <h2>Create Event</h2>
    <div class="create-event">
      <div class="col-2">
        <text-input
          data-cy="event-name"
          name="event-name"
          label="Event Name"
          placeholder="Alexander Lemtov Live"
          v-model="name"
          :validationError="nameError"
          :isRequired="true"
        />
        <text-input
          data-cy="event-venue"
          name="event-venue"
          label="Event Venue"
          placeholder="Sherwood Event Hall, WA"
          v-model="venue"
          :validationError="venueError"
          :isRequired="true"
        />
        <date-input
          data-cy="event-date"
          name="event-date"
          label="Event Date"
          v-model="date"
          :validationError="dateError"
          :isRequired="true"
        />
        <time-input
          data-cy="event-time"
          name="event-time"
          label="Event Time"
          v-model="time"
          :isRequired="true"
        />
        <number-input
          data-cy="ticket-quantity"
          name="ticket-quantity"
          label="Ticket Quanity"
          placeholder="142"
          v-model="ticketQuantity"
          :validationError="ticketQuantityError"
          :isRequired="true"
        />
        <text-area
          data-cy="event-notes"
          name="event-notes"
          label="Additional Notes"
          placeholder="Register now! Dress in orange..."
          v-model="additionalNotes"
          :isRequired="false"
        />
        <div class="actions">
          <Button
            className="primary"
            label="Create"
            data-cy="create-btn"
            id="create-btn"
            :onClick="() => postEvent()"
          />
          <Button
            className="secondary"
            label="Cancel"
            data-cy="cancel-btn"
            id="cancel-btn"
            :onClick="() => router.push('/')"
          />
        </div>
      </div>
      <div class="col-2">
        <cover-select name="event-image" v-model="image" />
      </div>
    </div>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";

import router from "../router";

import {
  TextInput,
  NumberInput,
  DateInput,
  TimeInput,
  CoverSelect,
  TextArea,
  Button,
} from "../components";

export default {
  components: {
    TextInput,
    NumberInput,
    DateInput,
    TimeInput,
    CoverSelect,
    TextArea,
    Button,
  },
  setup() {
    const store = useStore();

    // define validation schema
    const schema = yup.object({
      "Event name": yup.string().required(),
      "Event venue": yup.string().required(),
      "Event date": yup
        .date()
        .required()
        .min(new Date(), "Event date must be in the future"),
      "Event time": yup.string(),
      "Ticket quantity": yup
        .number()
        .required()
        .typeError("Ticket quanitity is a required field")
        .min(1),
      "Additional notes": yup.string(),
      "Event image": yup.string(),
    });

    const { validate } = useForm({
      validationSchema: schema,
    });

    // create fields
    const { value: name, errorMessage: nameError } = useField("Event name");
    const { value: venue, errorMessage: venueError } = useField("Event venue");
    const { value: date, errorMessage: dateError } = useField("Event date");
    const { value: additionalNotes } = useField("Additional notes");

    const { value: time } = useField("Event time", undefined, {
      initialValue: "12:00AM",
    });

    const {
      value: ticketQuantity,
      errorMessage: ticketQuantityError,
    } = useField("Ticket quantity");

    const { value: image } = useField("Event image", undefined, {
      initialValue: "./assets/event-1.jpg",
    });

    // create event
    const postEvent = async () => {
      const { valid } = await validate();

      if (!valid) {
        return;
      }

      store
        .dispatch("createEvent", {
          name: name.value,
          venue: venue.value,
          date: date.value,
          time: time.value,
          ticketQuantity: ticketQuantity.value,
          additionalNotes: additionalNotes.value,
          image: image.value,
        })
        .then((data) => {
          router.push(`/event/${data._id}`);
        });
    };

    return {
      schema,
      name,
      nameError,
      venue,
      venueError,
      date,
      dateError,
      time,
      ticketQuantity,
      ticketQuantityError,
      additionalNotes,
      image,
      postEvent,
      router,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  display: block;
  text-transform: uppercase;
  color: rgb(195, 195, 195);
  font-size: 1.5vw;
  text-align: left;
  font-weight: 600;
  margin: 60px 10%;
}
.create-event {
  margin: 0 5%;
  .col-2 {
    width: 50%;
    float: left;
    .actions {
      margin: 20px 10%;
      button {
        width: 25%;
        float: left;
        margin-bottom: 20px;
        &:nth-child(1) {
          margin-right: 3%;
        }
      }
    }
  }
}
</style>