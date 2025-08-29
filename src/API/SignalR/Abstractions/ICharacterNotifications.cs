using Domain.Procesor;

namespace Webly.SignalR.Abstractions
{
    public interface ICharacterNotifications
    {
        Task SendCharactersToClient(string processedString, string userId, ProcessStringRequest request,
            CancellationToken cancellationToken);
    }
}
