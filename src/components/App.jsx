import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from 'redux/filterSlice';
import { selectContacts, selectFilter } from 'redux/selectors';

import Loader from './Loader/Loader';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';
import { Container } from './Container/Container';
import { HeadTilte } from './HeadTilte/HeadTilte';
import { ContactList } from './Contacts/ContactList';
import { FormAddContact } from './Forms/FormAddContact';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
    addContactThunk,
    deleteContactThunk,
    getAllContactThunk,
} from 'redux/operations';

export function App() {
    const { items, isLoading, error } = useSelector(selectContacts);
    const filter = useSelector(selectFilter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllContactThunk());
    }, [dispatch]);

    const onAddContact = contactData => {
        const findUser = items.find(el => el.name === contactData.name.trim());

        if (findUser) {
            Notify.warning(`<b>${findUser.name}</b> is already in contacts`, {
                plainText: false,
            });
            return;
        }
        dispatch(addContactThunk(contactData));
    };

    const onRemoveContact = contactId => {
        dispatch(deleteContactThunk(contactId));
    };

    const onFilter = filterTerm => {
        dispatch(setFilter(filterTerm));
    };

    const filteredContacts = () => {
        if (!!filter) {
            return items.filter(contact => {
                return (
                    contact.name
                        .toLowerCase()
                        .includes(filter.toLowerCase().trim()) ||
                    contact.phone.includes(filter.trim())
                );
            });
        }
        return items;
    };

    return (
        <>
            {isLoading && <Loader />}
            <Section>
                <Container>
                    <HeadTilte title="Phonebook" />
                    <FormAddContact onAddContact={onAddContact} />
                </Container>
            </Section>

            {!!error ? (
                <Section>
                    <Container>
                        <p>{error}</p>
                    </Container>
                </Section>
            ) : !!items.length ? (
                <Section>
                    <Container>
                        <HeadTilte title="Contacts" />
                        <Filter filter={filter} onFilterChange={onFilter} />
                        <ContactList
                            contacts={filteredContacts()}
                            onRemoveContact={onRemoveContact}
                        />
                    </Container>
                </Section>
            ) : (
                <Section>
                    <Container>
                        <HeadTilte title="No contacts" />
                    </Container>
                </Section>
            )}
        </>
    );
}
