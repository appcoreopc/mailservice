import SoundPlayer from '../../service/sound-player'
import SoundPlayerConsumer from '../../service/sound-player-consumer';

jest.mock('../../service/sound-player'); 

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (SoundPlayer as jest.Mock<SoundPlayer>).mockClear();
});

it('We can check if the consumer called the class constructor', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it('We can check if the consumer called a method on the class instance', () => {
    // Show that mockClear() is working:
    expect(SoundPlayer).not.toHaveBeenCalled();
  
    const soundPlayerConsumer = new SoundPlayerConsumer();
 
    // Constructor should have been called again:
    const coolSoundFileName = 'song.mp3';
    soundPlayerConsumer.playSomethingCool();

    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    let sp = (SoundPlayer as jest.Mock<SoundPlayer>);
    const mockPlaySoundFile = sp.mock.instances[0].playSoundFile;
    
    // mock.instances is available with automatic mocks:
    // const mockSoundPlayerInstance = soundPlayerMock.mock.instances[0];
    // const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
    // expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
    // // Equivalent to above check:
    expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
  });
